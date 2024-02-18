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
type HillKey = string[][];
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
    return "";
  }
};

const safeAtob = (v: string) => {
  try {
    const result = atob(v);
    return result;
  } catch {
    return "";
  }
};

const App = () => {
  const [form, setForm] = useState<CipherForm>({
    cipher: Cipher.StandardVigenere,
    key: "",
    inputType: InputType.Text,
    textInputType: TextInputType.Text,
    textInput: "",
  });

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
          key: [],
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
    setForm({
      ...form,
      cipher: v,
      key: "",
    });
  };

  const handleTextKeyChange = (v: string) => {
    setForm({
      ...form,
      key: v,
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
                />
              </div>
            </>
          )}
          {isHillKey(form.key, form.cipher) && (
            <span>TODO - Implement Hill Key input</span>
          )}
          {isSuperKey(form.key, form.cipher) && (
            <>
              <div className="flex flex-col gap-[1rem]">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Vigenere key
                </h4>
                <Input
                  type="number"
                  placeholder="Enter vigenere key ..."
                  value={form.key.vigenere}
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
        <Button>Perform encryption
          
        </Button>
      </div>
    </div>
  );
};

export default App;
