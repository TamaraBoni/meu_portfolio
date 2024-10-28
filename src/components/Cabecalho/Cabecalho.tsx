import Menu from "../Menu/Menu";

export default function Cabecalho() {
  return (
    <header className="bg-red-500 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meu Portfólio Acadêmico</h1>
        <Menu />
      </div>
    </header>
  );
}
