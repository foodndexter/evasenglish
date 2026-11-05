export function a(message: string, onClick?: () => void) {
  alert(message);
  if (onClick) onClick();
  return;
}

export function c(message: string, onOk: () => void, onCancel?: () => void) {
  if (confirm(message)) {
    onOk();
    return;
  }
  if (onCancel) onCancel();
  return;
}
