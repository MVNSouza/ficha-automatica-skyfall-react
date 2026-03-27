import { useForm, Controller } from "react-hook-form";

import antecedentesData from "@/assets/data/antecedentes.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import BaseCard from "../ui/base-card";

const antecedentes = antecedentesData.antecedentes;

type AntecedentesType = typeof antecedentes;

type FormData = {
  antecedente: keyof AntecedentesType;
};

export function SelectAntecedente() {
  const { control, watch } = useForm<FormData>();

  const antecedenteSelecionado = watch("antecedente");

  const antecedenteAtual = antecedenteSelecionado
    ? antecedentes[antecedenteSelecionado]
    : null;

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">

      {/* SELECT ANTECEDENTE */}
      <Controller
        name="antecedente"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value ?? ""}>
            <SelectTrigger className="w-full h-12 bg-card border border-border text-foreground">
              <SelectValue placeholder="Selecione um Antecedente" />
            </SelectTrigger>

            <SelectContent className="bg-card border border-border text-foreground">
              {Object.entries(antecedentes).map(([key, antecedente]) => (
                <SelectItem key={key} value={key}>
                  {antecedente.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {/* INFO DO ANTECEDENTE */}
      {antecedenteAtual && (
        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
          <h2 className="flex items-center justify-center text-xl font-bold text-foreground">
            {antecedenteAtual.nome}
          </h2>

          <p className="flex items-center justify-center mt-3 text-muted-foreground leading-relaxed text-center">
            {antecedenteAtual.descricao}
          </p>
        </div>
      )}

      {/* SCROLL COM HABILIDADES BASE */}
      {antecedenteAtual && (
        <BaseCard title="Características do Antecedente">

          <div className="flex flex-col gap-3">
            {antecedenteAtual.habilidadesBase.map((habilidade, index) => (
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
