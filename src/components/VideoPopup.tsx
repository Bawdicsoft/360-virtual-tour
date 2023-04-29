import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import VideoPlayer from "./VideoPlayer";
import { CloseButtonSVG } from "./SVG";

interface VideoPopupProps {
  open: boolean;
  setOpen: any;
}

const VideoPopup = ({ open, setOpen }: VideoPopupProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-2 text-center items-center sm:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-3xl">
                <VideoPlayer src="/assets/mov_bbb.mp4"></VideoPlayer>

                <button
                  onClick={() => setOpen(false)}
                  className="bg-white absolute top-2 right-2 rounded-lg p-1.5 h-min"
                >
                  <CloseButtonSVG />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default VideoPopup;
