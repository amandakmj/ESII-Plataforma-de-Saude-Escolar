const API_BASE_URL = process.env.NEXT_PUBLIC_API_ULR ?? "http://localhost:8000";

// Caso seja uma rota com parâmetro basta fazer o seguinte para substituir
// apiUrls.route.replace("{param}", value).replace("...")

const apiUrls = {
    // Rotas de Login e Registro
    login: `${API_BASE_URL}/login`,
  
    // Rotas de Alerta
    createAlert: `${API_BASE_URL}/create`,
    getAlerts: `${API_BASE_URL}/getAlerts`,
    viewAlert: `${API_BASE_URL}/viewAlert`,
  
    // Rotas de Turmas
    addStudentToClass: `${API_BASE_URL}/turmas/{turma_id}/alunos/{aluno_id}`,
    removeStudentFromClass: `${API_BASE_URL}/turmas/{turma_id}/alunos/{aluno_id}`,
    listStudentsByClass: `${API_BASE_URL}/turmas/{turma_id}/alunos`,
  
    // Rotas de Alunos
    createAluno: `${API_BASE_URL}/create_alunos`,
    getAluno: `${API_BASE_URL}/get_aluno/{aluno_id}`,
    updateAluno: `${API_BASE_URL}/update_aluno/`,
    deleteAluno: `${API_BASE_URL}/delete_aluno/{aluno_id}`,
  
    // Rotas de Escolas
    createSchool: `${API_BASE_URL}/create`,
    listSchools: `${API_BASE_URL}/`,
    getSchool: `${API_BASE_URL}/get/{escola_id}`,
    updateSchool: `${API_BASE_URL}/update`,
  
    // Rotas de Profissionais de Saúde
    updateHealthSpeciality: `${API_BASE_URL}/update_especialidade/{usuario_id}`,
  
    // Rotas de Relatórios
    generateIndividualStudentReport: `${API_BASE_URL}/relatorio/saude{aluno_id}`,
    generateTotalStatisticsReport: `${API_BASE_URL}/relatorios/estatisticas`,
    generateHealthReportByClass: `${API_BASE_URL}/relatorio_saude/turma/{turma_id}`,
  
    // Rotas de Saúde dos Alunos
    createSaudeAluno: `${API_BASE_URL}/create`,
    getSaudeAluno: `${API_BASE_URL}/get_saude_id/{saude_id}`,
    updateSaudeAluno: `${API_BASE_URL}/update_aluno_id/{saude_id}`,
    deleteSaudeAluno: `${API_BASE_URL}/delete_saude_id/{saude_id}`,
  
    // Rotas de Usuários
    createUser: `${API_BASE_URL}/usuarios/create`,
    listUsers: `${API_BASE_URL}/usuarios/`,
    getUser: `${API_BASE_URL}/usuarios/get/{usuario_id}`,
    updateUser: `${API_BASE_URL}/usuarios/update`,
    deleteUser: `${API_BASE_URL}/usuarios/delete/{usuario_id}`,
  
    // Rotas de Turmas (para as turmas, já tem um prefixo /turmas)
    createClass: `${API_BASE_URL}/turmas/`,
    getClass: `${API_BASE_URL}/turmas/`,
    getClassById: `${API_BASE_URL}/turmas/{turma_id}`,
    updateClass: `${API_BASE_URL}/turmas/{turma_id}`,
    deleteClass: `${API_BASE_URL}/turmas/{turma_id}`,
  };
  

export default apiUrls;