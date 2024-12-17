import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ContentState = {
    contentList: { id: number; description: string }[]; // Lista de conteúdos
    currentContent: string | null; // Conteúdo atual exibido/alterado
    currentId: number | null; // ID do conteúdo selecionado
};

const initialState: ContentState = {
    contentList: [], // Inicia vazio
    currentContent: null,
    currentId: null,
};

const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        // Ação para preencher o conteúdo vindo da API
        setContentListFromApi: (state, action: PayloadAction<{ id: number; description: string }[]>) => {
            state.contentList = action.payload; // Preenche a lista com os dados da API
        },
        setCurrentContent: (state, action: PayloadAction<{ id: number; description: string }>) => {
            // Atualiza o conteúdo atual e o ID com base na ação despachada
            const content = state.contentList.find(item => item.id === action.payload.id)?.description || null;
            state.currentContent = content;
            state.currentId = action.payload.id;
        },
        clearCurrentContent: (state) => {
            state.currentContent = null;
            state.currentId = null;
        },
        addContent: (state, action: PayloadAction<string>) => {
            // Adiciona um novo conteúdo à lista com um ID incremental
            const newId = state.contentList.length;
            state.contentList.push({ id: newId, description: action.payload });
        },
        updateContent: (state, action: PayloadAction<{ id: number; description: string }>) => {
            // Atualiza o conteúdo na lista com base no ID
            const contentItem = state.contentList.find(item => item.id === action.payload.id);
            if (contentItem) {
                contentItem.description = action.payload.description;
            }
        },
        removeTaskFromList: (state, action: PayloadAction<number>) => {
            // Remove a tarefa da lista de conteúdo
            state.contentList = state.contentList.filter(item => item.id !== action.payload);
        },
    },
});

export const { setCurrentContent, clearCurrentContent, addContent, updateContent, setContentListFromApi, removeTaskFromList } = contentSlice.actions;
export default contentSlice.reducer;
