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

type CipherForm = {
  cipher: Cipher;
  key: CipherKey;
};

const App = () => {
  const [form, setForm] = useState<CipherForm>({
    cipher: Cipher.StandardVigenere,
    key: "",
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
          <RadioGroup className="flex gap-[2rem]" defaultValue="text">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text" id="text" />
              <Label htmlFor="text">Text</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="file" id="file" />
              <Label htmlFor="file">File</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default App;
