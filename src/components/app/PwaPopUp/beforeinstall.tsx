/* eslint-disable no-console */
import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const BeforeInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const addListener = () => {
      window.addEventListener('beforeinstallprompt', (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowInstallButton(true);
      });
    };

    addListener();

    return () => {
      window.removeEventListener('beforeinstallprompt', addListener);
    };
  }, []);

  const handleInstallClick = () => {
    deferredPrompt.prompt();
    setShowInstallButton(false);

    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou a instalação.');
      } else {
        console.log('Usuário rejeitou a instalação.');
      }
      setDeferredPrompt(null);
    });
  };

  return showInstallButton ? (
    <Button
      onClick={handleInstallClick}
      leftIcon={<FaDownload />}
      colorScheme="blue"
      w="100%"
      borderRadius={0}
    >
      Instalar Meu Bairro
    </Button>
  ) : null;
};

export default BeforeInstallPrompt;
