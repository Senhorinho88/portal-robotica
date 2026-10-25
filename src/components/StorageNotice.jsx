import { useLearning } from "../context/LearningContext.jsx";
import Icon from "./Icon.jsx";

export default function StorageNotice() {
  const { storageAvailable } = useLearning();
  if (storageAvailable) return null;
  return (
    <div className="storage-notice" role="status">
      <Icon name="help" size={19} />
      <p>
        <strong>Seu progresso está disponível apenas nesta sessão.</strong> O
        navegador não permitiu salvar os dados locais. Você pode continuar
        estudando, mas as alterações podem se perder ao fechar ou atualizar a
        página.
      </p>
    </div>
  );
}
