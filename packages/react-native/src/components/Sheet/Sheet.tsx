import React, { useState } from 'react';
import { SheetContext, SheetProps } from './SheetContext';

/**
 * Sheet - A modal panel that slides in from the edge of the screen.
 *
 * Supports four sides (bottom, top, left, right) with gesture-based dismissal.
 * Uses compound components pattern for flexible composition.
 *
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger>
 *     <Button>Open Sheet</Button>
 *   </SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Edit Profile</SheetTitle>
 *       <SheetDescription>Make changes to your profile.</SheetDescription>
 *     </SheetHeader>
 *     <Text>Sheet content here...</Text>
 *     <SheetFooter>
 *       <SheetClose>
 *         <Button variant="ghost">Cancel</Button>
 *       </SheetClose>
 *       <Button>Save</Button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
export function Sheet({
  children,
  open: controlledOpen,
  onOpenChange,
  side = 'bottom',
}: SheetProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <SheetContext.Provider value={{ open, onOpenChange: handleOpenChange, side }}>
      {children}
    </SheetContext.Provider>
  );
}
