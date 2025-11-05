import { useEffect, useState } from "react";
import { ApiService } from "../../services/api";

export default function Landing() {
  const [post, setPost] = useState<[]>(null);

  useEffect(() => {
    ApiService.get('/posts').then(data => {
      setPost(data);
    }).catch(error => {
      console.error('Error fetching posts:', error);
    });
  }, [])
	return (
    <div className="flex flex-wrap justify-center gap-4 w-full">
      {post?.map((el, idx) => (
        <div
          key={idx}
          className="flex flex-col flex-grow bg-[var(--fg)] rounded-lg overflow-hidden w-full sm:w-1/2 lg:w-1/4"
        >
          <div 
            className={`h-48 bg-no-repeat bg-cover bg-center m-4 rounded-lg`}
            style={{ backgroundImage: `url(${el.image})` }} 
            aria-label={`Imagem: ${el.title}`}
          />
          <div className="flex flex-col flex-1 justify-between p-4">
            <h3 className="text-[var(--text)] mb-2 text-left w-full font-semibold">{el.title}</h3>
            <p className="text-[var(--text)] text-sm leading-relaxed">{el.description}</p>
          </div>
        </div>
      ))}
    </div>
	);
}
