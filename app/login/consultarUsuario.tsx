

// export const validarLogin = async (usuario: string, senha: string): Promise<{ sucesso: boolean; mensagem?: string }> => {
//     try {
//       const resposta = await fetch("https://seu-backend.com/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ usuario, senha }),
//       });
  
//       if (!resposta.ok) {
//         throw new Error("Erro ao conectar com o servidor");
//       }
  
//       const dados = await resposta.json();
  
//       if (dados.sucesso) {
//         return { sucesso: true };
//       } else {
//         return { sucesso: false, mensagem: dados.mensagem || "Usuário ou senha incorretos" };
//       }
//     } catch (erro) {
//       return { sucesso: false, mensagem: erro.message || "Erro inesperado" };
//     }
//   };
  