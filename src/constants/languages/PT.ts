import LanguageBase from './LanguageBase'
import LanguageCodeConstants from './LanguageCodeConstants'

/**
 * @description Conjunto de textos em português
 */
export default class PT implements LanguageBase {
  APP_NAME = 'DinoApp'

  CURIOUS_DINO_ALT = 'Dinossauro curioso'

  ISO_LANGUAGE_CODE = 'pt'

  NAVIGATOR_LANGUAGE_CODE = LanguageCodeConstants.PORTUGUESE

  LANGUAGE_PORTUGUESE = 'Português'

  LANGUAGE_ENGLISH = 'Inglês'

  NOT_FOUND_MESSAGE = 'Item não encontrado.'

  NOT_FROND_REDIRECT_MESSAGE = 'Redirecionado...'

  WELCOME_MESSAGE = 'Bem vindo ao DinoApp!'

  LOGIN_BUTTON_TEXT = 'Entrar com o Google'

  LOGOUT_BUTTON_DESCRIPTION =
    'Imagem de uma porta aberta com uma seta indicando saída.'

  SEARCH_HOLDER = 'Buscar...'

  LOGIN_FAIL_BY_GOOGLE = 'Erro no login com o Google.'

  LOGIN_FAIL_BY_API = 'Erro no login com o servidor do DinoApp.'

  LOGIN_CANCELED = 'Login cancelado.'

  UNKNOW_ERROR = 'Erro desconhecido.'

  LOGIN_REFRESH_NECESSARY =
    'Ocorreu um erro. Precisamos que se autentique novamente, por favor.'

  AVATAR_ALT = 'Imagem de perfil do usuário com as bordas arredondadas.'

  LOGOUT_DIALOG_QUESTION = 'Tem certeza que deseja sair do DinoApp?'

  LOGOUT_DIALOG_DESCRIPTION =
    "Se disser 'SIM' todos os dados referentes a sua conta serão removidos deste dispositivo."

  AGREEMENT_OPTION_TEXT = 'SIM'

  DISAGREEMENT_OPTION_TEXT = 'NÃO'

  ADD_OPTION_TEXT = 'ADICIONAR'

  CANCEL_OPTION_TEXT = 'CANCELAR'

  EDIT_OPTION_TEXT = 'Editar'

  DELETE_OPTION_TEXT = 'Deletar'

  MENU_HOME = 'Home'

  MENU_GAMES = 'Jogos'

  MENU_SETTINGS = 'Configurações'

  MENU_GLOSSARY = 'Glossário'

  MENU_CONTACTS = 'Contatos'

  MENU_FAQ = 'F.A.Q.'

  MENU_LOGOUT = 'Sair'

  MENU_ABOUT_US = 'Sobre Nós'

  SETTINGS_TITLE = 'Configurações'

  SETTINGS_LANGUAGE = 'Escolher Idioma'

  SETTINGS_FAQ = 'Escolher F.A.Q'

  SETTINGS_SAVE = 'Salvar'

  SETTINGS_SAVE_SUCCESS = 'Configurações salvas.'

  MENU_NOTES = 'Notas'

  MENU_CALENDAR = 'Calendário'

  NOTES_HEADER_IMAGE_DESC =
    'Imagem com um caderno de anotações com uma mão escrevendo.'

  ADD_BUTTON = 'Clique para adicionar um novo item.'

  NOTE_STATE_DONE = 'Anotação respondida.'

  NOTE_STATE_NOT_DONE = 'Anotação ainda não possui uma resposta.'

  NOTE_SHOW_ANSWER = 'Clique para ver a resposta desta pergunta logo abaixo.'

  NOTE_EDIT_ANSWER_BUTTON = 'Clique aqui para editar a resposta dessa anotação.'

  NOTE_EDIT_QUESTION_BUTTON =
    'Clique aqui para editar a pergunta desta anotação.'

  NOTE_DELETE_BUTTON = 'Clique aqui para apagar está anotação.'

  ANSWER_NOTE_DIALOG_TITLE = 'Resposta'

  NOTE_TAG_LABEL = 'Tags'

  DIALOG_SAVE_BUTTON_LABEL = 'Clique para salvar.'

  DIALOG_SAVE_BUTTON_TEXT = 'Salvar'

  DIALOG_CANCEL_BUTTON_LABEL = 'Clique para cancelar.'

  DIALOG_CANCEL_BUTTON_TEXT = 'Cancelar'

  SEARCH_BUTTON_LABEL = 'Buscar...'

  ANSWER_DIALOG_LABEL = 'Tela para responder uma questão anotada.'

  FORM_NAME = 'Nome'

  FORM_DESCRIPTION = 'Descrição'

  FORM_TYPE = 'Tipo'

  FORM_PHONE = 'Telefone'

  FORM_QUESTION = 'Pergunta'

  FORM_QUESTION_PLACEHOLDER = 'Castores gostam de castanhas?'

  FORM_QUESTION_TITLE = 'Mande sua pergunta!'

  FORM_ADD_PHONE = 'Adicionar Telefone'

  NOT_FOUND_QUESTION_FAQ = 'Não encontrou sua pergunta?'

  CONTACTS_ADD_CONTACT = 'Novo Contato'

  CONTACTS_MOBILE_PHONE = 'Móvel'

  CONTACTS_RESIDENTIAL_PHONE = 'Fixo'

  CONTACTS_PUBLIC_SERVICE_PHONE = 'Serviço'

  NO_AVAILABLE_TEXT = 'Sem Texto Disponível'

  JANUARY = 'Janeiro'

  FEBRUARY = 'Fevereiro'

  MARCH = 'Março'

  APRIL = 'Abril'

  MAY = 'Maio'

  JUNE = 'Junho'

  JULY = 'Julho'

  AUGUST = 'Agosto'

  SEPTEMBER = 'Setembro'

  OCTOBER = 'Outubro'

  NOVEMBER = 'Novembro'

  DECEMBER = 'Dezembro'

  INVALID_MONTH = 'Mês inválido'

  STRING_DATE_FORMAT = 'DD de MM de YYYY'

  DELETE_NOTE_ALERT_TITLE = 'Tem certeza que deseja excluir esta anotação?'

  DELETE_NOTE_ALERT_TEXT =
    'Ao aceitar esta anotação será removida permanentemente.'

  LOADING = 'Carregando...'

  NO_OPTIONS = 'Sem opções'

  EMPTY_FIELD_ERROR = 'Campo não pode ser vazio.'

  QUESTION_ALREADY_EXISTS_ERROR = 'Questão já adicionada.'

  DISCONNECTED_MESSAGE =
    'Você está desconectado da Internet. Para salvar alterações locais conecte-se a Internet.'

  CONNECTED_MESSAGE = 'Agora você está conectado!'

  SYNC_STARTED = 'Sincronizando dados...'

  SYNC_FINISH = 'Dados sincronizados!'

  SYNC_FAIL = 'Sincronização falhou. Iremos tentar novamente...'

  SYNC_CONNECTION_FAIL =
    'Erro de conexão durante a sincronização. Assim que a conexão retornar tentaremos novamente.'

  CANT_LOGIN_DISCONNECTED = 'Conexão com a internet necessária para login'

  DISCONNECTED = 'Desconectado'

  SELECT_FAQ_BUTTON = 'Busque FAQ'

  SELECT_TREATMENT = 'Selecione Tratamento'

  SUNDAY_NAME = 'Domingo'

  MONDAY_NAME = 'Segunda'

  TUESDAY_NAME = 'Terça'

  WEDNESDAY_NAME = 'Quarta'

  THURSDAY_NAME = 'Quinta'

  FRIDAY_NAME = 'Sexta'

  SATURDAY_NAME = 'Sabádo'

  NEXT_BUTTON_TEXT = 'Próximo'

  PREVIOUS_BUTTON_TEXT = 'Anterior'

  CLOSE_ARIA_LABEL = 'Fechar'

  DELETE_ARIA_LABEL = 'Deletar'

  EDIT_ARIA_LABEL = 'Editar'

  INVALID_WEEKDAY = 'Dia da semana inválido.'

  TODAY = 'Hoje'

  DATE_FROM = 'De'

  DATE_TO = 'Até'

  MEDICAL_APPOINTMENT_TYPE = 'Consulta médica'

  MEDICINE_TYPE = 'Medicamento'

  INVALID_EVENT_TYPE = 'Tipo de evento inválido'

  MINUTES = 'minutos '

  HOURS = 'horas'

  DAYS = 'dias'

  AND = 'e'

  BEFORE = 'antes'

  MINUTE = 'minuto'

  HOUR = 'hora'

  DAY = 'dia'

  ADD_EVENT_TITLE = 'Novo Evento'

  EVENT_TYPE_LABEL = 'Tipo de Evento'

  EVENT_NAME_LABEL = 'Nome do Evento'

  EVENT_INIT_DATE_LABEL = 'Dia de início'

  EVENT_INIT_TIME_LABEL = 'Horário de início'

  EVENT_END_DATE_LABEL = 'Dia de termino'

  EVENT_END_TIME_LABEL = 'Horário de termino'

  DATE_PICKER_DAY_FORMAT = 'dd/MM/yyyy'

  EVENT_REPEAT_NOT_REPEAT = 'Náo se repete'

  EVENT_REPEAT_EVERY_DAY = 'Todos os dias'

  EVENT_REPEAT_EVERY_WEEK = 'Todas as semenas'

  EVENT_REPEAT_EVERY_MONTH = 'Todos os meses'

  EVENT_REPEAT_EVERY_YEAR = 'Todos os anos'

  EVENT_REPEAT_EVERY_CUSTOMIZED = 'Personalizado'

  EVENT_REPEAT_TYPE_LABEL = 'Tipo de repetição do evento'

  INVALID_EVENT_REPEAT_TYPE = 'Tipo de repetição inválida'

  EVENT_TITLE_ICON_ALT = 'Escolha o título do evento'

  EVENT_TYPE_ICON_ALT = 'Escolha o tipo do evento'

  EVENT_DATE_ICON_ALT = 'Escolha a data do evento'

  EVENT_REPEAT_ICON_ALT = 'Escolha a repetição do evento'

  EVENT_REPEAT_END_DATE_LABEL = 'Final da repetição'

  EVENT_WEEKDAY_SELECT_LABEL = 'Selecione os dias:'

  EVENT_ALERT_ALT = 'Adicionar alertas antes do evento'

  EVENT_ADD_ALARM_LABEL = 'Tempo'

  EVENT_ADD_ALARM_TYPE_LABEL = 'Medida de tempo'

  EVENT_ADD_ALERT = 'Adicionar notificação'

  EVENT_INVALID_ALARM_TYPE = 'tipo inválido'

  EVENT_ALARM_ZERO = 'Na hora do evento'

  EVENT_ALARM_DELETE_ALT = 'Clique para excluir o alarme'

  CHANGE_COLOR_ARIA_LABEL = 'Clique para selecionar uma cor aleatória'

  ADD_PHONE_ARIA_LABEL = 'Clique para adicionar um novo telefone numérico'

  RETURN_ARIA_LABEL = 'Retornar'

  SEARCH_ARIA_LABEL = 'Pesquisar'

  OPEN_MENU_ARIA_LABEL = 'Abrir menu'

  CLOSE_MENU_ARIA_LABEL = 'Fechar menu'

  CLICK_TO_OPEN_MENU_ITEM = 'Clique para abrir '

  ADD_ARIA_LABEL = 'Adicionar'

  OPTIONS_ARIA_LABEL = 'Opções'

  EVENT_COLOR_LABEL = 'Cor selecionada'

  FAQ_CONNECTION_ERROR = 'Conexão com a internet necessária'

  MAX = 'Máx.'

  ADD_COLUMN_TEXT = '+ Adicionar coluna'

  COLUMN_ADD_LABEL = 'Adicionar Coluna'

  COLUMN_EDIT_LABEL = 'Editar Coluna'

  COLUMN_TITLE_LABEL = 'Título da coluna'

  COLUMN_MIN_LENGTH_ERROR = 'Mínimo 1 caractere.'

  COLUMN_TITLE_ALREADY_EXISTS_ERROR = 'Título já existente'

  NOTE_COLUMN_DELETE_DIALOG_QUESTION =
    'Tem certeza que deseja remover esta coluna?'

  NOTE_COLUMN_WITH_NOTES_DELETE_DIALOG_QUESTION =
    'Esta coluna possui anotações, tem certeza que deseja removê-la?'

  NOTE_COLUMN_DELETE_DIALOG_DESC =
    'Caso responda "SIM" esta coluna será removida permanentemente.'

  NOTE_COLUMN_WITH_NOTES_DELETE_DIALOG_DESC =
    'Ao remover esta coluna você irá remover as anotações pertencentes a ela permanentemente.'

  NOTE_COLUMN_DELETE_DIALOG_AGREE_TEXT = 'SIM'

  NOTE_COLUMN_ADD_NOTE_TEXT = 'Adicionar anotação'

  NOTE_EDIT_DIALOG_NEW_NOTE_TITLE = 'Nova anotação'

  QUESTION_NOTE_DIALOG_TITLE = 'Pergunta'

  NOTE_INFO_DIALOG_LAST_UPDATE_TITLE = 'Última atualização:'

  NOTE_INFO_DIALOG_COLUMN_TITLE = 'Coluna:'

  NOTE_SEARCH_CLEAN = 'Nenhuma anotação corresponde a pesquisa atual.'

  CLASSIC_THEME_NAME = 'Clássico'

  DARK_THEME_NAME = 'Escuro'

  DALTONIAN_THEME_NAME = 'Alto contraste'

  COLOR_THEME_SELECTION_TITLE = 'Escolher Tema de Cores'
}
