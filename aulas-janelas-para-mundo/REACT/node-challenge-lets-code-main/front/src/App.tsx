import {
  AppShell,
  Button,
  Container,
  Group,
  Header,
  MantineProvider,
  Title,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Funcionarios } from './pages/Funcionarios';
import { Pedidos } from './pages/Pedidos';
import { Produtos } from './pages/Produtos';

const verifyPage = (page: string) => {
  return page === useLocation().pathname;
};

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <AppShell
          padding="md"
          header={
            <Header
              height={60}
              p="xs"
              style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              <Title color="blue">Desafio Let's Code</Title>
              <Group style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  pl="xl"
                  pr="xl"
                  variant={verifyPage('/produtos') ? 'filled' : 'subtle'}
                  component={Link}
                  to={'/produtos'}
                >
                  Produtos
                </Button>
                <Button
                  pl="xl"
                  pr="xl"
                  variant={verifyPage('/pedidos') ? 'filled' : 'subtle'}
                  component={Link}
                  to={'/pedidos'}
                >
                  Pedidos
                </Button>
                <Button
                  pl="xl"
                  pr="xl"
                  variant={verifyPage('/funcionarios') ? 'filled' : 'subtle'}
                  component={Link}
                  to={'/funcionarios'}
                >
                  Funcionarios
                </Button>
              </Group>
            </Header>
          }
        >
          <Container style={{ minWidth: '90%' }}>
            <Routes>
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/funcionarios" element={<Funcionarios />} />
              <Route
                path="*"
                element={<Navigate to="/funcionarios" replace />}
              />
            </Routes>
          </Container>
        </AppShell>
      </NotificationsProvider>
    </MantineProvider>
  );
}
