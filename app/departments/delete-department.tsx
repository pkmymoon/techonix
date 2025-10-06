import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "components/ui/alert-dialog";
import { Button } from "components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function DeleteDepartmentModal({ deptId }: { deptId: string }) {
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  async function onSubmit() {
    console.log("hi");
    setDeleting(true);
    const token = localStorage.getItem("authToken");
    const res = await fetch(
      `https://employee-react.onrender.com/emp/delete-department/${deptId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setDeleting(false);
      setOpen(false);
      toast.success("Deleted successfully!");
      navigate("/departments");
    } else {
      // Registration failed
      setDeleting(false);
      toast.error("Failed to delete!", {
        description: data.message,
      });
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 /> Delete{" "}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            department from the db.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={() => onSubmit()}>
            {deleting ? (
              <>
                <Loader2 className="animate-spin" /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
