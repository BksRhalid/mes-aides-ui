export default {
    format(ressortissant_eee) {
        return ressortissant_eee == 'true';
    },

    route(state) {
        if (! state.openfiscaSituation.individus[0].ressortissant_eee)
            return 'titre-sejour';
    },
};
