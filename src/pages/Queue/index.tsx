import { Loader } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import { genQRCode } from 'services/qrCode';

import socket from 'services/socket';

const QueuePage: React.FC = () => {
  const [qrValue, setQrValue] = useState<string | undefined>();
  const [qrCode, setQrCode] = useState<string | undefined>();
  const [_, setTimeLeft] = useState<number>(120);

  const [qrCodeHasAccessed, setQrCodeHasAccessed] = useState(false);

  const navigate = useNavigate();

  const generateQrValue = useCallback(async () => {
    const websiteUrl = window.location.origin;
    const qrCode = await genQRCode();
    setQrCode(qrCode);
    setQrCodeHasAccessed(false);
    setQrValue(`${websiteUrl}/guest?qr=${qrCode}`);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (qrCodeHasAccessed) return;
      generateQrValue();
      setTimeLeft(120);
    }, 120000);

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [generateQrValue, qrCodeHasAccessed]);

  useEffect(() => {
    generateQrValue();
  }, [generateQrValue]);

  socket.once('qr_code_accessed', (token: string) => {
    setQrCodeHasAccessed(prevState => token === qrCode ? true : prevState);
  });

  socket.once('guest_user_login_with_qr_code', ({ qrCodeId }) => {
    if (qrCodeId === qrCode) {
      navigate('/queue/info?qr=' + qrCode, {
        replace: true,
        relative: "path",
      });
      window.location.reload();
    }
  });

  return (
    <div className="queue-page flex flex-col w-full h-full items-center justify-center space-y-8">
      {qrCodeHasAccessed ?
        <span className="timer max-w-md text-center mb-8">
          Acesse seu telefone para continuar.
        </span>
        : (
          <span className="timer max-w-md text-center mb-8">
            Acesse o QR Code abaixo para entrar na fila. O código será atualizado a cada 2 minutos.
          </span>
        )}
      <div className="qr-code-container flex items-center justify-center p-4 w-80 aspect-square border rounded-md">
        {qrValue && !qrCodeHasAccessed
          ? <QRCode value={qrValue} />
          : <Loader size={64} className='animate-spin' />
        }
      </div>
      {!qrCodeHasAccessed && (
        <span className="timer text-gray-400">
          Próxima atualização em{" "}
          {String(Math.floor(_ / 60)).padStart(2, '0')}:{String(Math.ceil(_ % 60)).padStart(2, '0')}
        </span>
      )}
    </div>
  );
};

export default QueuePage;