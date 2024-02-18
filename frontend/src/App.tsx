import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

enum Cipher {
  StandardVigenere = "standard-vigenere",
  AutoKeyVigenere = "auto-key-vigenere",
  ExtendedVigenere = "extended-vigenere",
  Playfair = "playfair",
  Affine = "affine",
  Hill = "hill",
  Super = "super",
}

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

const App = () => {
  return (
    <div className="max-w-[1160px] mx-auto p-[2rem]">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Cipher
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Secure your file/texts by using our cipher technology!
      </p>
      <div className="p-[2rem] border-2 border-black mt-6 rounded-xl">
        <div className="flex flex-col gap-[1rem]">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Cipher
          </h3>
          <Select defaultValue={Cipher.StandardVigenere}>
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
        <div className="flex flex-col gap-[1rem] mt-[2rem]">
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
