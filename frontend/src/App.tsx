import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useState } from "react";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import axios from "axios";

const BE_URL = "http://localhost:3000";

enum Cipher {
  StandardVigenere = "standard-vigenere",
  AutoKeyVigenere = "auto-key-vigenere",
  ExtendedVigenere = "extended-vigenere",
  Playfair = "playfair",
  Affine = "affine",
  Hill = "hill",
  Super = "super",
}

const isCipher = (v: string): v is Cipher => {
  return (
    v === Cipher.Affine ||
    v === Cipher.AutoKeyVigenere ||
    v === Cipher.ExtendedVigenere ||
    v === Cipher.Hill ||
    v === Cipher.Playfair ||
    v === Cipher.StandardVigenere ||
    v === Cipher.Super
  );
};

const ciphers = [
  {
    id: Cipher.StandardVigenere,
    label: "Standard Vigenere Cipher",
  },
  {
    id: Cipher.AutoKeyVigenere,
    label: "Auto-Key Vigenere Cipher",
  },
  {
    id: Cipher.ExtendedVigenere,
    label: "Extended Vigenere Cipher",
  },
  {
    id: Cipher.Playfair,
    label: "Playfair Cipher",
  },
  {
    id: Cipher.Affine,
    label: "Affine Cipher",
  },
  {
    id: Cipher.Hill,
    label: "Hill Cipher",
  },
  {
    id: Cipher.Super,
    label: "Super Cipher",
  },
];

type TextKey = string;
type AffineKey = {
  m: string;
  b: string;
};
type HillKey = {
  matrixSize: string;
  matrix: string[][];
};
type SuperKey = {
  vigenere: string;
  transposition: string;
};
type CipherKey = TextKey | AffineKey | HillKey | SuperKey;

const isTextKey = (_key: CipherKey, cipher: Cipher): _key is TextKey => {
  return (
    cipher === Cipher.AutoKeyVigenere ||
    cipher === Cipher.ExtendedVigenere ||
    cipher === Cipher.StandardVigenere ||
    cipher === Cipher.Playfair
  );
};
const isAffineKey = (_key: CipherKey, cipher: Cipher): _key is AffineKey => {
  return cipher === Cipher.Affine;
};
const isHillKey = (_key: CipherKey, cipher: Cipher): _key is HillKey => {
  return cipher === Cipher.Hill;
};
const isSuperKey = (_key: CipherKey, cipher: Cipher): _key is SuperKey => {
  return cipher === Cipher.Super;
};

enum InputType {
  Text = "text",
  File = "file",
}

enum TextInputType {
  Text = "text",
  Base64 = "base64",
}

type CipherForm = {
  cipher: Cipher;
  key: CipherKey;
  inputType: string;
  textInputType: string;
  textInput: string;
};

const safeBtoa = (v: string) => {
  try {
    const result = btoa(v);
    return result;
  } catch {
    return "Cannot convert to base64";
  }
};

const safeAtob = (v: string) => {
  try {
    const result = atob(v);
    return result;
  } catch {
    return "Invalid base64";
  }
};

enum PageStatus {
  None = "NONE",
  Loading = "LOADING",
}

type CipherResult = {
  data: {
    text: string;
    base64: string;
  };
};

const App = () => {
  const [form, setForm] = useState<CipherForm>({
    cipher: Cipher.StandardVigenere,
    key: "",
    inputType: InputType.Text,
    textInputType: TextInputType.Text,
    textInput: "",
  });

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
    form.inputType === InputType.Text &&
    form.textInput !== "";

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
      : "";
  };

  const handleEncryptClick = async () => {
    try {
      setCipherResult(null);
      setPageStatus(PageStatus.Loading);

      const textToSend =
        form.textInputType === TextInputType.Text
          ? form.textInput
          : safeAtob(form.textInput);

      const key = generateRequestKey();

      const { data } = await axios.put<CipherResult>(
        `${BE_URL}/cipher/${form.cipher}/encrypt/text`,
        {
          text: textToSend,
          key,
        }
      );

      setCipherResult(data);
    } catch {
      window.alert("Failed to perform encryption");
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
    } catch {
      window.alert("Failed to perform encryption");
    } finally {
      setPageStatus(PageStatus.None);
    }
  };

  return (
    <div className="max-w-[1160px] mx-auto p-[2rem]">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Cipher
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Secure your file/texts by using our cipher technology!
      </p>
      <div className="p-[2rem] border-2 border-black mt-6 rounded-xl space-y-[2rem]">
        <div className="flex flex-col gap-[1rem]">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Cipher
          </h3>
          <Select
            defaultValue={Cipher.StandardVigenere}
            value={form.cipher}
            onValueChange={handleCipherChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a cipher" />
            </SelectTrigger>
            <SelectContent>
              {ciphers.map((cipher) => {
                return (
                  <SelectItem value={cipher.id} key={cipher.id}>
                    {cipher.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Key
          </h3>
          {isTextKey(form.key, form.cipher) && (
            <Input
              type="text"
              placeholder="Enter cipher key ..."
              value={form.key}
              onChange={(e) => handleTextKeyChange(e.currentTarget.value)}
            />
          )}
          {isAffineKey(form.key, form.cipher) && (
            <>
              <div className="flex flex-col gap-[1rem]">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Value for m
                </h4>
                <Input
                  type="number"
                  placeholder="Enter value for m ..."
                  value={form.key.m}
                  onChange={(e) =>
                    handleAffineKeyMChange(e.currentTarget.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-[1rem]">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Value for b
                </h4>
                <Input
                  type="number"
                  placeholder="Enter value for b ..."
                  value={form.key.b}
                  onChange={(e) => {
                    handleAffineKeyBChange(e.currentTarget.value);
                  }}
                />
              </div>
            </>
          )}
          {isHillKey(form.key, form.cipher) && (
            <>
              <div className="flex flex-col gap-[1rem]">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Matrix size (minimum = 2)
                </h4>
                <Input
                  type="number"
                  placeholder="Enter value for m ..."
                  value={form.key.matrixSize}
                  onChange={(e) =>
                    handleHillKeyMatrixSizeChange(e.currentTarget.value)
                  }
                  min={2}
                />
              </div>
              {form.key.matrixSize && (
                <div className="flex flex-col gap-[1rem]">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Matrix
                  </h4>
                  {form.key.matrix.map((row, rowIndex) => {
                    return (
                      <div key={rowIndex} className="flex gap-[1rem]">
                        {row.map((entry, entryIndex) => {
                          return (
                            <Input
                              key={entryIndex}
                              type="number"
                              className="w-[100px]"
                              value={entry}
                              onChange={(e) => {
                                handleHillKeyMatrixChange(
                                  rowIndex,
                                  entryIndex,
                                  e.currentTarget.value
                                );
                              }}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
          {isSuperKey(form.key, form.cipher) && (
            <>
              <div className="flex flex-col gap-[1rem]">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Vigenere key
                </h4>
                <Input
                  type="text"
                  placeholder="Enter vigenere key ..."
                  value={form.key.vigenere}
                  onChange={(e) =>
                    handleSuperKeyVigenereChange(e.currentTarget.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-[1rem]">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Transposition key
                </h4>
                <Input
                  type="number"
                  placeholder="Enter transposition key ..."
                  value={form.key.transposition}
                  onChange={(e) =>
                    handleSuperKeyTranspositionChange(e.currentTarget.value)
                  }
                />
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col gap-[1rem]">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Input Type
          </h3>
          <RadioGroup
            className="flex gap-[2rem]"
            defaultValue={InputType.Text}
            value={form.inputType}
            onValueChange={handleInputTypeChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={InputType.Text} id={InputType.Text} />
              <Label htmlFor={InputType.Text}>Text</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={InputType.File} id={InputType.File} />
              <Label htmlFor={InputType.File}>File</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Input
          </h3>
          {form.inputType === InputType.Text && (
            <>
              <RadioGroup
                className="flex gap-[2rem]"
                defaultValue={TextInputType.Text}
                value={form.textInputType}
                onValueChange={handleTextInputTypeChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="text" />
                  <Label htmlFor="text">Text</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="base64" id="base64" />
                  <Label htmlFor="base64">Base 64</Label>
                </div>
              </RadioGroup>
              <div className="flex gap-[2rem]">
                <div className="space-y-[1rem] flex-1">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Text
                  </h4>
                  <Textarea
                    placeholder="Type text to encrypt/decrypt here ..."
                    disabled={form.textInputType === TextInputType.Base64}
                    value={
                      form.textInputType === TextInputType.Text
                        ? form.textInput
                        : safeAtob(form.textInput)
                    }
                    onChange={(e) =>
                      handleTextInputChange(e.currentTarget.value)
                    }
                  />
                </div>
                <div className="space-y-[1rem] flex-1">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Base64
                  </h4>
                  <Textarea
                    placeholder="Type base64 to encrypt/decrypt here ..."
                    disabled={form.textInputType === TextInputType.Text}
                    value={
                      form.textInputType === TextInputType.Base64
                        ? form.textInput
                        : safeBtoa(form.textInput)
                    }
                    onChange={(e) =>
                      handleTextInputChange(e.currentTarget.value)
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-[1rem]">
          <Button
            disabled={!isFormComplete || pageStatus === PageStatus.Loading}
            onClick={handleEncryptClick}
          >
            Perform encryption {pageStatus === PageStatus.Loading && "..."}
          </Button>
          <Button
            disabled={!isFormComplete || pageStatus === PageStatus.Loading}
            onClick={handleDecryptClick}
          >
            Perform decryption {pageStatus === PageStatus.Loading && "..."}
          </Button>
        </div>
        {cipherResult && (
          <div className="flex flex-col gap-[1rem]">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Output
            </h3>
            {form.inputType === InputType.Text && (
              <div className="flex gap-[2rem]">
                <div className="space-y-[1rem] flex-1">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Text
                  </h4>
                  <Textarea value={cipherResult.data.text} readOnly />
                </div>
                <div className="space-y-[1rem] flex-1">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Base64
                  </h4>
                  <Textarea value={cipherResult.data.base64} readOnly />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
