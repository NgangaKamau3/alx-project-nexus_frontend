"use client";

import * as React from "react";
import { Resizable, ResizableProps } from "re-resizable";
import { GripVerticalIcon } from "lucide-react";

import { cn } from "./utils";

// ResizableBox - Main resizable container component
interface ResizableBoxProps extends Partial<ResizableProps> {
  children: React.ReactNode;
  className?: string;
  defaultWidth?: string | number;
  defaultHeight?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  enable?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    topRight?: boolean;
    bottomRight?: boolean;
    bottomLeft?: boolean;
    topLeft?: boolean;
  };
}

function ResizableBox({
  children,
  className,
  defaultWidth = "100%",
  defaultHeight = "auto",
  minWidth = 100,
  minHeight = 100,
  maxWidth = "100%",
  maxHeight = "100%",
  enable = {
    top: false,
    right: true,
    bottom: false,
    left: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
  },
  ...props
}: ResizableBoxProps) {
  return (
    <Resizable
      defaultSize={{
        width: defaultWidth,
        height: defaultHeight,
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      enable={enable}
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </Resizable>
  );
}

// ResizablePanelGroup - Container for multiple resizable panels
interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
}

function ResizablePanelGroup({
  className,
  direction = "horizontal",
  children,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <div
      data-slot="resizable-panel-group"
      data-panel-group-direction={direction}
      className={cn(
        "flex h-full w-full",
        direction === "vertical" ? "flex-col" : "flex-row",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ResizablePanel - Individual panel within a group
interface ResizablePanelProps
  extends Omit<Partial<ResizableProps>, "defaultSize"> {
  children: React.ReactNode;
  className?: string;
  defaultSize?: number | string;
  minSize?: number | string;
  maxSize?: number | string;
  direction?: "horizontal" | "vertical";
}

function ResizablePanel({
  children,
  className,
  defaultSize = "50%",
  minSize = 100,
  maxSize = "100%",
  direction = "horizontal",
  ...props
}: ResizablePanelProps & { defaultSize?: number | string }) {

  const enable = React.useMemo(() => {
    if (direction === "horizontal") {
      return {
        right: true,
        left: false,
        top: false,
        bottom: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      };
    }
    return {
      bottom: true,
      right: false,
      left: false,
      top: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false,
    };
  }, [direction]);

  const defaultSizeConfig = React.useMemo(() => {
    if (direction === "horizontal") {
      return {
        width: defaultSize,
        height: "100%",
      };
    }
    return {
      width: "100%",
      height: defaultSize,
    };
  }, [direction, defaultSize]);

  return (
    <Resizable
      data-slot="resizable-panel"
      defaultSize={defaultSizeConfig}
      minWidth={direction === "horizontal" ? minSize : undefined}
      minHeight={direction === "vertical" ? minSize : undefined}
      maxWidth={direction === "horizontal" ? maxSize : undefined}
      maxHeight={direction === "vertical" ? maxSize : undefined}
      enable={enable}
      className={cn("flex-shrink-0", className)}
      {...props}
    >
      {children}
    </Resizable>
  );
}

// ResizableHandle - Visual handle for resizing
interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean;
  direction?: "horizontal" | "vertical";
}

function ResizableHandle({
  withHandle = true,
  direction = "horizontal",
  className,
  ...props
}: ResizableHandleProps) {
  return (
    <div
      data-slot="resizable-handle"
      data-panel-group-direction={direction}
      className={cn(
        "bg-border focus-visible:ring-ring relative flex items-center justify-center after:absolute focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden",
        direction === "horizontal"
          ? "w-px h-full after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2"
          : "h-px w-full after:inset-x-0 after:top-1/2 after:h-1 after:-translate-y-1/2",
        withHandle && direction === "vertical" && "[&>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </div>
  );
}

// Export all components
export { 
  ResizableBox, 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
};

export type {
  ResizableBoxProps,
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
};
