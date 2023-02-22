module.exports = {
    requestFail: {
        code: 404,
        message: 'request failed',
    },

    userNameIsRequired: {
        code: 422,
        message: 'Username é obrigatorio',
    },

    passwordIsRequired: {
        code: 422,
        message: 'Senha é obrigatorio',
    },

    confirmPasswordIsRequired: {
        code: 422,
        message: 'Confirme a senha',
    },
    differentsPasswords: {
        code: 422,
        message: 'Senhas diferentes',
    },

    userExists: {
        code: 400,
        message: 'Por favor, utilize outro userName',
    },
    userNotExists: {
        code: 401,
        message: 'Usuário não encontrado',
    },
  }
