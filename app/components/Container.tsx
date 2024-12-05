import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-[640px] pt-[100px]">{children}</div>;
};
