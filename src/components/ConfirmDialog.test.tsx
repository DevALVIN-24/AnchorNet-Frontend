import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmDialog } from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  it("renders nothing when closed", () => {
    render(
      <ConfirmDialog
        open={false}
        title="Deactivate anchor"
        message="Are you sure?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("renders the title and message when open", () => {
    render(
      <ConfirmDialog
        open
        title="Deactivate anchor"
        message='Deactivate anchor "a"?'
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("Deactivate anchor")).toBeInTheDocument();
    expect(screen.getByText('Deactivate anchor "a"?')).toBeInTheDocument();
  });

  it("uses default button labels unless overridden", () => {
    render(
      <ConfirmDialog
        open
        title="t"
        message="m"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls onConfirm when the confirm button is clicked", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        open
        title="t"
        message="m"
        confirmLabel="Deactivate"
        onConfirm={onConfirm}
        onCancel={() => {}}
      />,
    );
    fireEvent.click(screen.getByText("Deactivate"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when the cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        open
        title="t"
        message="m"
        cancelLabel="Keep settlement"
        onConfirm={() => {}}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByText("Keep settlement"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("autofocuses the cancel button when it opens", () => {
    render(
      <ConfirmDialog
        open
        title="t"
        message="m"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByText("Cancel")).toHaveFocus();
  });

  it("calls onCancel when Escape is pressed", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        open
        title="t"
        message="m"
        onConfirm={() => {}}
        onCancel={onCancel}
      />,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("does not call onCancel for other keys", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        open
        title="t"
        message="m"
        onConfirm={() => {}}
        onCancel={onCancel}
      />,
    );
    fireEvent.keyDown(document, { key: "Enter" });
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("traps Tab focus from the confirm button back to the cancel button", () => {
    render(
      <ConfirmDialog
        open
        title="t"
        message="m"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    screen.getByText("Confirm").focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(screen.getByText("Cancel")).toHaveFocus();
  });

  it("traps Shift+Tab focus from the cancel button back to the confirm button", () => {
    render(
      <ConfirmDialog
        open
        title="t"
        message="m"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    screen.getByText("Cancel").focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(screen.getByText("Confirm")).toHaveFocus();
  });
});
