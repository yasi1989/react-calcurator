import { useState } from "react";
import CustomButton from "../components/CustomButton";
import Decimal from "decimal.js";

const Main = () => {
    const [leftOperand, setLeftOperand] = useState<string>("0");
    const [operator, setOperator] = useState<string | undefined>(undefined);
    const [rightOperand, setRightOperand] = useState<string | undefined>(undefined);
    const [result, setResult] = useState<string | undefined>(undefined);

    const handleButtonClick = (value: string) => {
        setResult(undefined);
        switch (value) {
            case "AC":
                setLeftOperand("0");
                setOperator(undefined);
                setRightOperand(undefined);
                break;
            case "+":
            case "-":
            case "*":
            case "/":
            case "%":
                setOperator(value);
                break;
            case "=":
                const left = new Decimal(leftOperand);
                const right = new Decimal(rightOperand ?? "0");

                let calculationResult: Decimal;
                switch (operator) {
                    case "+":
                        calculationResult = left.plus(right);
                        break;
                    case "-":
                        calculationResult = left.minus(right);
                        break;
                    case "*":
                        calculationResult = left.times(right);
                        break;
                    case "/":
                        calculationResult = right.isZero() ? new Decimal("Infinity") : left.div(right);
                        break;
                    case "%":
                        calculationResult = left.mod(right);
                        break;
                    default:
                        calculationResult = new Decimal(0);
                        break;
                }
                setResult(calculationResult.toString());
                setLeftOperand("0");
                setOperator(undefined);
                setRightOperand(undefined);
                break;
            case ".":
                if(operator) {
                    if (rightOperand !== undefined) {
                        setRightOperand(rightOperand.includes(".") ? rightOperand : rightOperand + ".");
                    }
                } else {
                    setLeftOperand(leftOperand.includes(".") ? leftOperand : leftOperand + ".");
                }
                break;
            case "±":
                if(operator) {
                    if(rightOperand !== undefined) {
                        setRightOperand((parseFloat(rightOperand) * -1).toString());
                    }
                } else {
                    setLeftOperand((parseFloat(leftOperand) * -1).toString())
                }
                break;
            default:
                if(operator) {
                    setRightOperand(((rightOperand === "0" || rightOperand === undefined) ? value : rightOperand + value));
                } else {
                    setLeftOperand(((leftOperand === "0") ? value : leftOperand + value));
                }
                break;
        }
    }

    const isResultButtonDisabled = !operator || !rightOperand;

  return (
    <main className="mt-40 constainer mx-auto flex justify-center items-center px-8 md:px-16 lg:px-24">
      <div className="grid grid-cols-4 min-w-96 gap-1 justify-items-center">
        {/* result */}
        <div className="col-span-4 bg-gray-400 text-white shadow-md flex justify-end items-center text-3xl rounded-md p-6 w-full">
            { result ? result : `${leftOperand} ${operator === undefined ? "" : operator} ${rightOperand === undefined ? "" : rightOperand}` }
        </div>

        {/* Buttons */}
        <CustomButton isNumber={false} placeholder="AC" onClick={handleButtonClick} />
        <CustomButton isNumber={false} placeholder="±" onClick={handleButtonClick} />
        <CustomButton isNumber={false} placeholder="%" onClick={handleButtonClick} />
        <CustomButton isNumber={false} placeholder="/" onClick={handleButtonClick} />

        <CustomButton isNumber={true} placeholder="7" onClick={handleButtonClick} />
        <CustomButton isNumber={true} placeholder="8" onClick={handleButtonClick} />
        <CustomButton isNumber={true} placeholder="9" onClick={handleButtonClick} />
        <CustomButton isNumber={false} placeholder="*" onClick={handleButtonClick} />

        <CustomButton isNumber={true} placeholder="4" onClick={handleButtonClick} />
        <CustomButton isNumber={true} placeholder="5" onClick={handleButtonClick} />
        <CustomButton isNumber={true} placeholder="6" onClick={handleButtonClick} />
        <CustomButton isNumber={false} placeholder="-" onClick={handleButtonClick} />

        <CustomButton isNumber={true} placeholder="1" onClick={handleButtonClick} />
        <CustomButton isNumber={true} placeholder="2" onClick={handleButtonClick} />
        <CustomButton isNumber={true} placeholder="3" onClick={handleButtonClick} />
        <CustomButton isNumber={false} placeholder="+" onClick={handleButtonClick} />

        <div className="col-span-2 w-full">
            <CustomButton isNumber={true} placeholder="0" onClick={handleButtonClick} />
        </div>
        <CustomButton isNumber={true} placeholder="." onClick={handleButtonClick} />
        <CustomButton isNumber={false} placeholder="=" onClick={handleButtonClick} disabled={isResultButtonDisabled} />
      </div>
    </main>
  );
};

export default Main;
