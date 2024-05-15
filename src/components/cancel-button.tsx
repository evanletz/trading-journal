import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";

export function AlertButton({ resetFunc }: { resetFunc: CallableFunction }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Cancel</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Click "Continue" to cancel any changes made.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => resetFunc()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteButton({
  deleteFunc,
  args,
}: {
  deleteFunc: CallableFunction;
  args: { tradeId: Id<"trades"> };
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2
          style={{
            cursor: "pointer",
            stroke: "red",
            background: "none",
            borderColor: "silver",
          }}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Click "Delete" to delete this journal entry. This action is
            irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={() => deleteFunc(args)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
