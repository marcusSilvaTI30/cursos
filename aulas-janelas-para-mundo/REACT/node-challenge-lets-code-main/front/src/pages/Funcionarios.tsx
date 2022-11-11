import { Box, Button, Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { CriarFuncionarioModal } from '../components/FuncionariosList/CriarFuncionarioModal/CriarFuncionarioModal';
import { FuncionarioList } from '../components/FuncionariosList/FuncionarioList';
import { findAllFuncionario, Funcionario } from '../services/funcionario';

export function Funcionarios() {
  const [funcionarios, setFuncionario] = useState<Funcionario[]>([]);
  const [haveChanges, setHaveChanges] = useState(true);
  const [openedModalCriar, setOpenedModalCriar] = useState(false);

  useEffect(() => {
    if (haveChanges) {
      findAllFuncionario().then((data) => {
        setFuncionario(data.data);
      });
    }

    setHaveChanges(false);
  }, [haveChanges]);

  return (
    <Box mt="lg">
      <Group
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title mb="lg" order={2}>
          Listagem de Funcionarios
        </Title>

        <Button onClick={() => setOpenedModalCriar(true)}>
          Adicionar Funcionario
        </Button>
      </Group>

      <FuncionarioList data={funcionarios} />

      {/* modal */}

      <CriarFuncionarioModal
        opened={openedModalCriar}
        updateList={() => setHaveChanges(true)}
        onClose={() => setOpenedModalCriar(false)}
      />
    </Box>
  );
}
