import {
  CipherForm,
  InputType,
  TextInputType,
  PageStatus,
  CipherResult,
  isCipher,
  isTextKey,
  isAffineKey,
  isSuperKey,
  isHillKey,
  BE_URL,
  Cipher,
} from "@/lib/constants";
import { safeAtob } from "@/lib/utils";
import { ExtFile } from "@files-ui/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const useCipherForm = () => {
  const [form, setForm] = useState<CipherForm>({
    cipher: Cipher.StandardVigenere,
    key: "",
    inputType: InputType.Text,
    textInputType: TextInputType.Text,
    textInput: "",
  });

  const [files, setFiles] = useState<ExtFile[]>([]);
  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
  };
  const removeFile = (id: number | string | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.None);

  const [cipherResult, setCipherResult] = useState<CipherResult | null>(null);

  const handleCipherChange = (v: string) => {
    if (!isCipher(v)) {
      return;
    }

    switch (v) {
      case Cipher.Affine: {
        setForm({
          ...form,
          cipher: v,
          key: {
            m: "",
            b: "",
          },
        });
        break;
      }
      case Cipher.Hill: {
        setForm({
          ...form,
          cipher: v,
          key: {
            matrixSize: "2",
            matrix: [
              ["", ""],
              ["", ""],
            ],
          },
        });
        break;
      }
      case Cipher.Super: {
        setForm({
          ...form,
          cipher: v,
          key: {
            vigenere: "",
            transposition: "",
          },
        });
        break;
      }
      default: {
        setForm({
          ...form,
          cipher: v,
          key: "",
        });
      }
    }

    setFiles([]);
  };

  const handleTextKeyChange = (v: string) => {
    if (!isTextKey(form.key, form.cipher)) {
      return;
    }

    setForm({
      ...form,
      key: v,
    });
  };

  const handleAffineKeyMChange = (m: string) => {
    if (!isAffineKey(form.key, form.cipher)) {
      return;
    }

    setForm({
      ...form,
      key: {
        ...form.key,
        m: m,
      },
    });
  };
  const handleAffineKeyBChange = (b: string) => {
    if (!isAffineKey(form.key, form.cipher)) {
      return;
    }

    setForm({
      ...form,
      key: {
        ...form.key,
        b: b,
      },
    });
  };

  const handleSuperKeyVigenereChange = (vigenere: string) => {
    if (!isSuperKey(form.key, form.cipher)) {
      return;
    }

    setForm({
      ...form,
      key: {
        ...form.key,
        vigenere: vigenere,
      },
    });
  };
  const handleSuperKeyTranspositionChange = (transposition: string) => {
    if (!isSuperKey(form.key, form.cipher)) {
      return;
    }

    setForm({
      ...form,
      key: {
        ...form.key,
        transposition: transposition,
      },
    });
  };

  const handleHillKeyMatrixSizeChange = (size: string) => {
    if (!isHillKey(form.key, form.cipher)) {
      return;
    }

    if (parseInt(size) < 2) {
      return;
    }

    const newMatrix: string[][] = [];
    const newSize = parseInt(size);
    for (let i = 0; i < newSize; i++) {
      const newRow: string[] = [];
      for (let j = 0; j < newSize; j++) {
        newRow.push("");
      }
      newMatrix.push(newRow);
    }

    setForm({
      ...form,
      key: {
        ...form.key,
        matrixSize: size,
        matrix: newMatrix,
      },
    });
  };
  const handleHillKeyMatrixChange = (
    row: number,
    col: number,
    value: string
  ) => {
    if (!isHillKey(form.key, form.cipher)) {
      return;
    }

    const newMatrix: string[][] = [];
    const size = parseInt(form.key.matrixSize);
    for (let i = 0; i < size; i++) {
      const newRow: string[] = [];
      for (let j = 0; j < size; j++) {
        if (i === row && j === col) {
          newRow.push(value);
        } else {
          newRow.push(form.key.matrix[i][j]);
        }
      }
      newMatrix.push(newRow);
    }

    setForm({
      ...form,
      key: {
        ...form.key,
        matrix: newMatrix,
      },
    });
  };

  const handleInputTypeChange = (v: string) => {
    setForm({
      ...form,
      inputType: v,
    });
  };

  const handleTextInputTypeChange = (v: string) => {
    setForm({
      ...form,
      textInputType: v,
      textInput: "",
    });
  };

  const handleTextInputChange = (v: string) => {
    setForm({
      ...form,
      textInput: v,
    });
  };

  const isKeyCompleted =
    (isTextKey(form.key, form.cipher) && form.key !== "") ||
    (isAffineKey(form.key, form.cipher) &&
      form.key.m !== "" &&
      form.key.b !== "") ||
    (isHillKey(form.key, form.cipher) &&
      form.key.matrix.filter((row) => {
        const filteredRow = row.filter((entry) => entry === "");
        return filteredRow.length > 0;
      }).length === 0) ||
    (isSuperKey(form.key, form.cipher) &&
      form.key.vigenere !== "" &&
      form.key.transposition !== "");

  const isFormComplete =
    isKeyCompleted &&
    ((form.inputType === InputType.Text && form.textInput !== "") ||
      (form.inputType === InputType.File && files.length > 0));

  const generateRequestKey = () => {
    return isTextKey(form.key, form.cipher)
      ? form.key
      : isAffineKey(form.key, form.cipher)
      ? {
          m: parseInt(form.key.m),
          b: parseInt(form.key.b),
        }
      : isSuperKey(form.key, form.cipher)
      ? {
          vigenere: form.key.vigenere,
          transposition: parseInt(form.key.transposition),
        }
      : isHillKey(form.key, form.cipher)
      ? form.key.matrix.map((row) => {
          return row.map((entry) => parseInt(entry));
        })
      : "";
  };

  const handleEncryptClick = async () => {
    try {
      setCipherResult(null);
      setPageStatus(PageStatus.Loading);

      const key = generateRequestKey();

      if (form.inputType === InputType.Text) {
        const textToSend =
          form.textInputType === TextInputType.Text
            ? form.textInput
            : safeAtob(form.textInput);

        const { data } = await axios.put<CipherResult>(
          `${BE_URL}/cipher/${form.cipher}/encrypt/text`,
          {
            text: textToSend,
            key,
          }
        );
        setCipherResult(data);
      } else {
        if (files.length === 0 || !files[0].file) {
          return;
        }

        const formData = new FormData();
        formData.append("file", files[0].file);
        formData.append("key", JSON.stringify(key));

        const { data } = await axios.put(
          `${BE_URL}/cipher/${form.cipher}/encrypt/file`,
          formData
        );
        console.log(data);
      }

      toast.success("Encryption done successfully!");
    } catch {
      toast.error("Failed to perform encryption.");
    } finally {
      setPageStatus(PageStatus.None);
    }
  };

  const handleDecryptClick = async () => {
    try {
      setCipherResult(null);
      setPageStatus(PageStatus.Loading);

      const textToSend =
        form.textInputType === TextInputType.Text
          ? form.textInput
          : safeAtob(form.textInput);

      const key = generateRequestKey();

      const { data } = await axios.put<CipherResult>(
        `${BE_URL}/cipher/${form.cipher}/decrypt/text`,
        {
          text: textToSend,
          key,
        }
      );

      setCipherResult(data);
      toast.success("Decryption done successfully!");
    } catch {
      toast.error("Failed to perform decryption.");
    } finally {
      setPageStatus(PageStatus.None);
    }
  };

  return {
    form,
    pageStatus,
    cipherResult,
    handleCipherChange,
    handleTextKeyChange,
    handleAffineKeyMChange,
    handleAffineKeyBChange,
    handleSuperKeyVigenereChange,
    handleSuperKeyTranspositionChange,
    handleHillKeyMatrixSizeChange,
    handleHillKeyMatrixChange,
    handleInputTypeChange,
    handleTextInputTypeChange,
    handleTextInputChange,
    isFormComplete,
    handleEncryptClick,
    handleDecryptClick,
    files,
    updateFiles,
    removeFile,
  };
};
