import {
  Box,
  Button,
  Grid,
  Modal,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import {
  findAllGerentes,
  Funcionario,
  updateFuncionario,
} from "../../../services/funcionario";

interface EditarFuncionarioModalProps {
  opened: boolean;
  onClose: () => void;
  updateList: () => void;
  data: {
    id: number;
    nome: string;
    cargo: string;
    gerente: Funcionario;
    email: string;
  };
}

export function EditarFuncionarioModal({
  data,
  opened,
  onClose,
  updateList
}: EditarFuncionarioModalProps) {
  const form = useForm({
    initialValues: {
      id: data.id,
      nome: data.nome,
      cargo: data.cargo,
      gerente: data.gerente ? data.gerente.id.toString() : "",
      email: "",
    },
  });

  const [gerentes, setGerentes] = useState<{ label: string; value: string }[]>(
    []
  );

  useEffect(() => {
    findAllGerentes().then((data) => {
      const result = data.data.map((item) => ({
        label: item.nome,
        value: item.id.toString(),
      }));
      setGerentes(result);
    });
  }, []);

  const handleSubmit = (values: {
    id: number;
    nome: string;
    cargo: string;
    gerente: string;
  }) => {
    updateFuncionario(values)
      .then(() => {
        showNotification({
          color: "green",
          title: "Sucesso",
          message: "Funcionario editado com sucesso",
        });
        updateList();
        onClose();
      })
      .catch((err) => {
        showNotification({
          color: "red",
          title: "Erro",
          message: err.response.data.message,
        });
        onClose();
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Editar Funcionario"
      size="md"
      padding="lg"
      centered
    >
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <Grid grow gutter="xl" mt="lg" mb="lg">
          <Grid.Col span={12}>
            <NumberInput
              label="id"
              placeholder="id"
              mb="md"
              required
              {...form.getInputProps("id")}
            />
            <TextInput
              label="Nome"
              placeholder="Nome"
              mb="md"
              required
              {...form.getInputProps("nome")}
            />
            <Select
              label="Cargo"
              placeholder="Cargo"
              mb="md"
              required
              data={[
                { label: "Vendedor", value: "VENDEDOR" },
                { label: "Gerente", value: "GERENTE" },
              ]}
              {...form.getInputProps("cargo")}
            />
            <Select
              label="Gerente"
              placeholder="Gerente"
              mb="md"
              data={[...gerentes]}
              {...form.getInputProps("gerente")}
            />
          </Grid.Col>
        </Grid>
        <Box style={{ display: "flex", justifyContent: "end", gap: "1rem" }}>
          <Button
            onClick={onClose}
            color="red"
            size="md"
            variant="subtle"
            pl="xl"
            pr="xl"
          >
            Cancelar
          </Button>
          <Button type="submit" color="blue" size="md" pl="xl" pr="xl">
            Salvar
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
