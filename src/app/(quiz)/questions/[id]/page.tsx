import { getIdFromSlug } from "@/utils";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function QuestionsPage({ params }: Props) {
    const { id } = await params;
    
    const { actualId, name } = getIdFromSlug(id);

    return (
        <div className="">
            <h1>Quiz questions {actualId}</h1>
            <p>Name: {name}</p>
        </div>
    );
}