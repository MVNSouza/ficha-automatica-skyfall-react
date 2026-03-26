import { useForm, Controller } from "react-hook-form";

import classesData from "@/assets/data/classes.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import BaseCard from "../ui/base-card";



const classes = classesData;

type ClassesType = typeof classes;

type FormData = {
  classe: keyof ClassesType;
};

export function SelectClasse() {
  const { control, watch } = useForm<FormData>();

  const classeSelecionada = watch("classe");

  const classeAtual = classeSelecionada
    ? classes[classeSelecionada]
    : null;

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">

      {/* SELECT CLASSE */}
      <Controller
        name="classe"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value ?? ""}>
            <SelectTrigger className="w-full h-12 bg-card border border-border text-foreground">
              <SelectValue placeholder="Selecione uma Classe" />
            </SelectTrigger>

            <SelectContent className="bg-card border border-border text-foreground">
              {Object.entries(classes).map(([key, classe]) => (
                <SelectItem key={key} value={key}>
                  {classe.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {/* INFO DA CLASSE */}
      {classeAtual && (
        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
          <h2 className="text-xl font-bold text-foreground text-center">
            {classeAtual.nome}
          </h2>

          <p className="mt-3 text-muted-foreground text-center">
            {classeAtual.descricao}
          </p>
        </div>
      )}

      {/* DADOS DE VIDA */}
      {classeAtual && (
        <BaseCard title="Dados de Vida">
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><strong>Dado de Vida:</strong> {classeAtual.dadoVida}</li>
            <li><strong>PV no 1º nível:</strong> {classeAtual.pv1Nivel}</li>
            <li><strong>PV por nível:</strong> {classeAtual.pvPorNivel}</li>
            <li><strong>Pontos de Ênfase:</strong> {classeAtual.pontosEnfase}</li>
          </ul>
        </BaseCard>
      )}

      {/* PROFICIÊNCIAS */}
      {classeAtual && (
        <BaseCard title="Proficiências">
          <div className="text-sm text-muted-foreground space-y-2">

            <p><strong>Armaduras:</strong> {classeAtual.proficiências.armaduras.join(", ") || "Nenhuma"}</p>

            <p><strong>Armas:</strong> {classeAtual.proficiências.armas.join(", ")}</p>

            <p><strong>Proteções:</strong> {classeAtual.proficiências.proteções.join(", ")}</p>

            <p><strong>Aptidões/Idiomas:</strong> {classeAtual.proficiências.aptidõesIdiomas.join(", ")}</p>

            <p><strong>Perícias:</strong> {classeAtual.proficiências.pericias.join(", ")}</p>

          </div>
        </BaseCard>
      )}

      {/* EQUIPAMENTO */}
      {classeAtual && (
        <BaseCard title="Equipamento Inicial">
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            {classeAtual.equipamentoInicial.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </BaseCard>
      )}

      {/* TABELA */}
      {classeAtual && (
        <BaseCard title="Progressão de Nível" maxHeight="300px">

          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            {classeAtual.tabela.map((nivel, i) => (
              <div
                key={i}
                className="p-2 rounded-md border border-border bg-background"
              >
                <p className="font-semibold text-foreground">
                  Nível {nivel.nivel} (Bônus +{nivel.bonusProf})
                </p>

                <p>{nivel.habilidades}</p>
              </div>
            ))}
          </div>

        </BaseCard>
      )}

    </div>
  );
}
