export const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        // Signup errors
        case 'auth/email-already-in-use':
            return 'Este email já está sendo usado por outra conta';
        case 'auth/invalid-email':
            return 'Email inválido';
        case 'auth/operation-not-allowed':
            return 'Operação não permitida';
        case 'auth/weak-password':
            return 'A senha deve ter pelo menos 6 caracteres';

        // Signin errors
        case 'auth/user-not-found':
            return 'Email ou senha incorretos';
        case 'auth/wrong-password':
            return 'Email ou senha incorretos';
        case 'auth/user-disabled':
            return 'Esta conta foi desativada';
        case 'auth/invalid-login-credentials':
            return 'Email ou senha incorretos';
        case 'auth/account-exists-with-different-credential':
            return 'Este email já está associado a outra forma de login';
        case 'auth/invalid-credential':
            return 'Credenciais inválidas';
        case 'auth/user-cancelled':
            return 'Login cancelado pelo usuário';

        // Common errors
        case 'auth/network-request-failed':
            return 'Erro de conexão. Verifique sua internet';
        case 'auth/too-many-requests':
            return 'Muitas tentativas. Tente novamente mais tarde';
        case 'auth/internal-error':
            return 'Erro interno. Tente novamente mais tarde';
        case 'auth/popup-closed-by-user':
            return 'Login cancelado. A janela foi fechada';
        case 'auth/cancelled-popup-request':
            return 'Operação cancelada. Múltiplas janelas abertas';
        case 'auth/popup-blocked':
            return 'O popup de login foi bloqueado pelo navegador';
        
        default:
            return 'Ocorreu um erro inesperado. Tente novamente';
    }
}; 