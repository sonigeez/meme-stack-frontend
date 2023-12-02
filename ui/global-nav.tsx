'use client';

import Link from 'next/link';
import { useParams, } from 'next/navigation';
import { MenuAlt2Icon, XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Byline from './ByLine';

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [folders, setFolders] = useState([]);

  const close = () => setIsOpen(false);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/sonigeez/meme-stack/contents/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const repoFolders = data.filter((item: { type: string; }) => item.type === 'dir');
        setFolders(repoFolders);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchFolders();
  }, []);

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800">
      <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
        <Link
          href="/"
          className="group flex w-full items-center gap-x-2.5"
          onClick={close}
        >

          <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
            MEME STACK
          </h3>
        </Link>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-100 group-hover:text-gray-400">
          Menu
        </div>
        {isOpen ? (
          <XIcon className="block w-6 text-gray-400" />
        ) : (
          <MenuAlt2Icon className="block w-6 text-gray-400" />
        )}
      </button>

      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-6 px-2 pb-24 pt-5">
          {folders.map((folder: any) => (
            <GlobalNavItem
              key={folder.name}
              item={folder.name}
              close={close}
            />
          ))}
        </nav>
        <Byline className="absolute hidden sm:block" />

      </div>
    </div>
  );
}

function GlobalNavItem({
  item,
  close,
}: {
  item: string;
  close: () => false | void;
}) {
  const segment = useParams();
  console.log(segment);
  const isActive = item === segment.name;

  return (
    <Link
      onClick={close}
      href={`/folder/${item}`}
      className={clsx(
        'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
        {
          'text-gray-400 hover:bg-gray-800': !isActive,
          'text-white': isActive,
        },
      )}
    >
      {item}
    </Link>
  );
}
