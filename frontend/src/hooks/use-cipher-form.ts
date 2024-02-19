import {
  BE_URL,
  Cipher,
  CipherForm,
  CipherResult,
  FileResult,
  InputType,
  PageStatus,
  TextInputType,
  isAffineKey,
  isCipher,
  isHillKey,
  isSuperKey,
  isTextKey,
} from "@/lib/constants";
import { downloadBufferAsFile, safeAtob } from "@/lib/utils";
import { ExtFile } from "@files-ui/react";
import axios from "axios";
import { base64ToBytes } from "byte-base64";
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
  const [fileResult, setFileResult] = useState<FileResult | null>(null);

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
      setFileResult(null);
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
        formData.append(
          "key",
          typeof key === "string" ? key : JSON.stringify(key)
        );

        const response = await axios.put(
          `${BE_URL}/cipher/${form.cipher}/encrypt/file`,
          formData
        );
        setFileResult({
          file: response.data,
          fileName:
            response.headers["content-disposition"].split("filename=")[1],
        });
      }

      toast.success("Encryption done successfully!");
    } catch (error) {
      toast.error("Failed to perform encryption.");
    } finally {
      setPageStatus(PageStatus.None);
    }
  };

  const handleDecryptClick = async () => {
    try {
      setCipherResult(null);
      setFileResult(null);
      setPageStatus(PageStatus.Loading);

      const key = generateRequestKey();

      if (form.inputType === InputType.Text) {
        const textToSend =
          form.textInputType === TextInputType.Text
            ? form.textInput
            : safeAtob(form.textInput);

        const { data } = await axios.put<CipherResult>(
          `${BE_URL}/cipher/${form.cipher}/decrypt/text`,
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
        formData.append(
          "key",
          typeof key === "string" ? key : JSON.stringify(key)
        );

        const response = await axios.put(
          `${BE_URL}/cipher/${form.cipher}/decrypt/file`,
          formData
        );

        const fileData =
          form.cipher === Cipher.ExtendedVigenere ||
          form.cipher === Cipher.Super
            ? base64ToBytes(response.data)
            : response.data;

        setFileResult({
          file: fileData,
          fileName:
            response.headers["content-disposition"].split("filename=")[1],
        });
      }

      toast.success("Decryption done successfully!");
    } catch (error) {
      toast.error("Failed to perform decryption.");
    } finally {
      setPageStatus(PageStatus.None);
    }
  };

  const handleDownloadClick = () => {
    if (!fileResult) {
      return;
    }

    downloadBufferAsFile(fileResult.file, fileResult.fileName);
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
    fileResult,
    handleDownloadClick,
  };
};
