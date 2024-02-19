import { Button } from "./components/ui/button";
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
import { Textarea } from "./components/ui/textarea";
import { useCipherForm } from "./hooks/use-cipher-form";
import {
  Cipher,
  InputType,
  PageStatus,
  TextInputType,
  isAffineKey,
  isHillKey,
  isSuperKey,
  isTextKey,
} from "./lib/constants";
import { safeAtob, safeBtoa } from "./lib/utils";
import { Dropzone, FileMosaic } from "@files-ui/react";

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
  const {
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
  } = useCipherForm();

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
          {form.inputType === InputType.File && (
            <Dropzone
              onChange={updateFiles}
              value={files}
              maxFiles={1}
              accept={
                form.cipher !== Cipher.ExtendedVigenere &&
                form.cipher !== Cipher.Super
                  ? ".txt"
                  : "*"
              }
            >
              {files.map((file) => (
                <FileMosaic
                  key={file.id}
                  {...file}
                  onDelete={removeFile}
                  info
                />
              ))}
            </Dropzone>
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
