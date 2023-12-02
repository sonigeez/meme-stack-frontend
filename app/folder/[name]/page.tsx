'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ModalSheet from '#/ui/ModaSheet';
import { flushSync } from 'react-dom';



interface Params {
    name: string;
}

export default function Page({ params }: { params: Params }) {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const startViewTransition = (open: boolean | ((prevState: boolean) => boolean)) => {
        if (!document.startViewTransition) {
            console.log('View Transitions are not supported');
            // Fallback for browsers without View Transitions support
            setIsModalOpen(open);
            if (!open) setSelectedImage(null);
            return;
        }
        console.log('View Transitions are supported');

        const transition = document.startViewTransition(() => {
            flushSync(() => {
                setIsModalOpen(open);
                if (!open) setSelectedImage(null);
            });




        });

        transition.finished.then(() => {
            // Handle the completion of the transition
            // Add any additional logic needed after the transition completes
        });
    };


    useEffect(() => {
        const repoPath = 'sonigeez/meme-stack/contents/' + params.name;
        fetchImagesFromGitHub(repoPath)
            .then(setImages)
            .catch(error => console.error('Error fetching images:', error));


    }, []);

    const openModal = (image: any) => {
        setSelectedImage(image);
        startViewTransition(true);
    };

    const closeModal = () => {
        startViewTransition(false);
    };

    return (
        <>
            <Head>
            </Head>
            <main className="mx-auto max-w-[1960px] p-4">
                <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-2">
                    {images.map((image: any) => (
                        <div
                            key={image.name}
                            className="rounded-lg mb-4 shaodw-xl cursor-pointer bg-zinc-500"
                            onClick={() => openModal("https://cdn.statically.io/gh/sonigeez/meme-stack/main/" + params.name + "/" + image.name)}
                        >
                            <Image
                                src={"https://cdn.statically.io/gh/sonigeez/meme-stack/main/" + params.name + "/" + image.name}
                                width={720}
                                height={420}
                                alt={image.name}
                                className="w-full saturate-150 rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </main>

            <ModalSheet isOpen={isModalOpen} closeModal={closeModal} image={selectedImage} />
        </>
    );
}





async function fetchImagesFromGitHub(repoPath: string, accessToken = null) {
    const baseUrl = 'https://api.github.com/repos';
    const headers = {};



    try {
        const response = await fetch(`${baseUrl}/${repoPath}`, { headers });
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(`GitHub API responded with ${response.status}: ${JSON.stringify(data)}`);
        }

        // Filter out non-image files and extract the download URL
        return data
            .filter((file: { type: string; name: string; }) => file.type === 'file' && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name))
            .map((file: { name: any; download_url: any; }) => ({
                name: file.name,
                download_url: file.download_url,
            }));
    } catch (error) {
        console.error('Error fetching images from GitHub:', error);
        return [];
    }
}
