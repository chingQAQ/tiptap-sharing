"use client";

import React from "react";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`container mx-auto max-w-[640px] pt-[100px] ${className}`}
    >
      {children}
    </div>
  );
};
