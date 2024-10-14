"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function LogoutDialog({ handleLogout }) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-white dark:text-black border-white dark:border-black bg-black dark:bg-white
             hover:bg-[hsl(var(--primary)/90)] dark:hover:bg-gray-300 
             hover:text-white dark:hover:text-black"
        >
          Logout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to logout?
        </DialogDescription>
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={closeDialog}>Cancel</Button>
          <Button
            onClick={() => {
              handleLogout();
              closeDialog();
            }}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
