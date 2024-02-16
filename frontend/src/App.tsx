import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

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
          <Select defaultValue="standard-vigenere">
            <SelectTrigger>
              <SelectValue placeholder="Select a cipher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard-vigenere">
                Standard Vigenere Cipher
              </SelectItem>
              <SelectItem value="auto-key-vigenere">
                Auto-Key Vigenere Cipher
              </SelectItem>
              <SelectItem value="extended-vigenere">
                Extended Vigenere Cipher
              </SelectItem>
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
