"use client";

import React, { useState, useEffect, useRef } from "react";

export const GetStartedButton = () => {
  //   const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
  //   const modalRef = useRef<HTMLDivElement>(null); // Ref for the modal

  //   const toggleModal = () => setIsOpen(!isOpen); // Function to toggle modal

  // Close modal when clicking outside
  //   useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       if (
  //         modalRef.current &&
  //         !modalRef.current.contains(event.target as Node)
  //       ) {
  //         setIsOpen(false);
  //       }
  //     };

  //     if (isOpen) {
  //       document.addEventListener("mousedown", handleClickOutside);
  //     } else {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     }

  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [isOpen]);

  return (
    <div className="relative group z-10">
      <div className="absolute -inset-1 bg-white rounded-lg blur-lg opacity-10 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 z-0"></div>
      <button
        className="relative bg-white text-black text-base px-5 py-3 rounded-lg z-50"
        // onClick={}
      >
        Get Started
      </button>

      {/* {isOpen && ( // Modal rendering
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white p-5 rounded-lg">
            <h2 className="text-lg font-bold">Sign Up / Login</h2>
            <form>
              <input
                type="email"
                placeholder="Email"
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 mb-4 w-full"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={toggleModal}
                className="ml-2 text-red-500"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};
