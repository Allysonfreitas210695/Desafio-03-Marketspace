import React, { useCallback, useImperativeHandle, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

interface CustomBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: string[];
}

export const CustomBottomSheet = React.forwardRef(
  (
    { children, snapPoints = ["1%", "50%", "72%"] }: CustomBottomSheetProps,
    ref
  ) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {
      console.log("BottomSheet state changed to index", index);
    }, []);

    useImperativeHandle(ref, () => ({
      expand: () => bottomSheetRef.current?.expand(),
      collapse: () => bottomSheetRef.current?.collapse(),
    }));

    return (
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        style={{
          zIndex: 1000,
        }}
      >
        <BottomSheetView style={{ backgroundColor: "white", padding: 20 }}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

CustomBottomSheet.displayName = "CustomBottomSheet";
