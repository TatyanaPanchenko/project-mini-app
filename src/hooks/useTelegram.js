const tg = window.Telegram.WebApp;
console.log(tg);
export function useTelegram() {
  const onClose = () => {
    tg.close();
  };
  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };
  return { onClose, onToggleButton, tg, user: tg.initDataUnsafe?.user };
}
