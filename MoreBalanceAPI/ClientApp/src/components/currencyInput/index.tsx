import { InputNumber } from "antd";

type CurrencyInputProps = {
    value?: number;
    onChange?: (value: number | null) => void;
};

export default function CurrencyInput({ value, onChange }: CurrencyInputProps) {

    const formatter = (value?: number | string) => {
        if (!value) return "";

        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(Number(value));
    };

    const parser = (value?: string) => {
        if (!value) return 0;

        const parsed = value
            .replace(/\s?R\$\s?/g, "")
            .replace(/\./g, "")
            .replace(",", ".");

        return Number(parsed);
    };

    return (
        <InputNumber
            style={{ width: "100%" }}
            value={value}
            formatter={formatter}
            parser={parser}
            onChange={onChange}
            step={0.01}
            min={0}
        />
    );
}