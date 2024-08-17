"use client";

import React, { useState, useEffect, useRef } from "react";

export const GetStartedButton = () => {
  return (
    <div className="relative group z-10">
      <div className="absolute -inset-1 bg-white rounded-lg blur-lg opacity-10 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 z-0"></div>
      <button className="relative bg-white text-black text-base px-5 py-3 rounded-lg z-50">
        Get Started
      </button>
    </div>
  );
};
