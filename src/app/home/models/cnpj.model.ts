export interface CnpjModel {
    atividade_principal:    Atividade[];
    data_situacao:          string;
    complemento:            string;
    nome:                   string;
    uf:                     string;
    telefone:               string;
    email:                  string;
    qsa:                    Qsa[];
    situacao:               string;
    bairro:                 string;
    logradouro:             string;
    numero:                 string;
    cep:                    string;
    municipio:              string;
    porte:                  string;
    abertura:               string;
    natureza_juridica:      string;
    fantasia:               string;
    cnpj:                   string;
    ultima_atualizacao:     string;
    status:                 string;
    tipo:                   string;
    efr:                    string;
    motivo_situacao:        string;
    situacao_especial:      string;
    data_situacao_especial: string;
    atividades_secundarias: Atividade[];
    capital_social:         string;
    extra:                  Extra;
    billing:                Billing;
}

export interface Atividade {
    text: string;
    code: string;
}

export interface Billing {
    free:     boolean;
    database: boolean;
}

export interface Extra {
}

export interface Qsa {
    qual: string;
    nome: string;
}
