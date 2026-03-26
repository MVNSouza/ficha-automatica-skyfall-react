import { useForm, Controller } from "react-hook-form";

import maldicaoData from "@/assets/data/maldicoes.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import BaseCard from "../ui/base-card";

const maldicoes = maldicaoData.maldicao;

type MaldicoesType = typeof maldicoes;

type FormData = {
  maldicao: keyof MaldicoesType;
};

export function SelectMaldicao() {
  const { control, watch } = useForm<FormData>();

  const maldicaoSelecionada = watch("maldicao");

  const maldicaoAtual = maldicaoSelecionada
    ? maldicoes[maldicaoSelecionada]
    : null;

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">

      {/* SELECT MALDIÇÃO */}
      <Controller
        name="maldicao"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value ?? ""}>
            <SelectTrigger className="w-full h-12 bg-card border border-border text-foreground">
              <SelectValue placeholder="Selecione uma Maldição" />
            </SelectTrigger>

            <SelectContent className="bg-card border border-border text-foreground">
              {Object.entries(maldicoes).map(([key, maldicao]) => (
                <SelectItem key={key} value={key}>
                  {maldicao.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {/* INFO DA MALDIÇÃO */}
      {maldicaoAtual && (
        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
          <h2 className="flex items-center justify-center text-xl font-bold text-foreground">
            {maldicaoAtual.nome}
          </h2>

          <p className="flex items-center justify-center text-sm text-primary font-medium">
            {maldicaoAtual.subtitulo}
          </p>

          <p className="flex items-center justify-center mt-3 text-muted-foreground leading-relaxed text-center">
            {maldicaoAtual.descricao}
          </p>
        </div>
      )}

      {/* SCROLL COM HABILIDADES BASE */}
      {maldicaoAtual && (
        <BaseCard title="Poderes da Maldição">

          <div className="flex flex-col gap-3">
            {maldicaoAtual.habilidadesBase.map((habilidade, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-border bg-background"
              >
                <p className="font-medium text-foreground">
                  {habilidade.nome}
                </p>

                <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside">
                  {habilidade.efeitos.map((efeito, i) => (
                    <li key={i}>
                      {efeito.tipo}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </BaseCard>
      )}
    </div>
  );
}
