import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import legadosData from "@/assets/data/legados.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import BaseCard from "../ui/base-card";


const legados = legadosData.legados;

type LegadosType = typeof legados;

type FormData = {
  legado: keyof LegadosType;
  heranca: string;
};

export function SelectLegado() {
  const { control, watch, setValue } = useForm<FormData>();

  const legadoSelecionado = watch("legado");

  const legadoAtual = legadoSelecionado
    ? legados[legadoSelecionado]
    : null;

  useEffect(() => {
    setValue("heranca", "");
  }, [legadoSelecionado, setValue]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">

      {/* SELECT LEGADO */}
      <Controller
        name="legado"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value ?? ""}>
            <SelectTrigger className="w-full h-12 bg-card border border-border text-foreground">
              <SelectValue placeholder="Selecione um Legado" />
            </SelectTrigger>

            <SelectContent className="bg-card border border-border text-foreground">
              {Object.entries(legados).map(([key, legado]) => (
                <SelectItem key={key} value={key}>
                  {legado.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {/* INFO DO LEGADO */}
      {legadoAtual && (
        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
          <h2 className="flex items-center justify-center text-xl font-bold text-foreground">
            {legadoAtual.nome}
          </h2>

          <p className="flex items-center justify-center text-sm text-primary font-medium">
            {legadoAtual.subtitulo}
          </p>

          <p className="flex items-center justify-center mt-3 text-muted-foreground leading-relaxed text-center">
            {legadoAtual.descricao}
          </p>
        </div>
      )}

      {/* CARD SCROLL COM ATRIBUTOS + HABILIDADES BASE */}
      {legadoAtual && (
        <BaseCard title="Características do Legado">

          {/* ATRIBUTOS */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-primary mb-2">
              Atributos
            </h3>

            <ul className="text-sm text-muted-foreground space-y-1">
              <li><strong>Idade:</strong> {legadoAtual.atributos.idade}</li>
              <li><strong>Deslocamento:</strong> {legadoAtual.atributos.deslocamento}m</li>
              <li><strong>Tamanho:</strong> {legadoAtual.atributos.tamanho}</li>
            </ul>
          </div>

          {/* HABILIDADES BASE */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-2">
              Habilidades Base
            </h3>

            <div className="flex flex-col gap-3">
              {legadoAtual.habilidadesBase.map((habilidade, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-border bg-background"
                >
                  <p className="font-medium text-foreground">
                    {habilidade.nome}
                  </p>

                  {/* efeitos (simples por enquanto) */}
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
          </div>

        </BaseCard>
      )}

      {/* SELECT HERANÇA */}
      {legadoAtual && (
        <Controller
          name="heranca"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <SelectTrigger className="w-full h-12 bg-card border border-border text-foreground">
                <SelectValue placeholder="Selecione uma Herança" />
              </SelectTrigger>

              <SelectContent className="bg-card border border-border text-foreground">
                {legadoAtual.herancas.map((heranca) => (
                  <SelectItem key={heranca.nome} value={heranca.nome}>
                    {heranca.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}
    </div>
  );
}
