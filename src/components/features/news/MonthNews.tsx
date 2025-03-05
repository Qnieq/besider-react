import React from 'react';
import { useGetNewsByMonthQuery } from '../../../services/news.service';
import { NewsArticle } from '../../../types/news.types';
import LazyImage from './LazyImage';

interface MonthNewsProps {
  year: number;
  month: number;
  polling?: boolean;
}

// Группируем статьи по дате публикации (без времени)
const groupByDate = (articles: NewsArticle[]): Record<string, NewsArticle[]> => {
  return articles.reduce((groups, article) => {
    const date = article.pub_date.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(article);
    return groups;
  }, {} as Record<string, NewsArticle[]>);
};

const MonthNews: React.FC<MonthNewsProps> = ({ year, month, polling = false }) => {
  const { data, error } = useGetNewsByMonthQuery(
    { year, month },
    { pollingInterval: polling ? 30000 : 0 }
  );

  if (error) {
    return <div className="text-center py-4">Ошибка загрузки новостей.</div>;
  }

  const articles = data?.response.docs || [];
  // Сортируем статьи по убыванию даты публикации
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime()
  );

  const grouped = groupByDate(sortedArticles);
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );


  return (
    <div>
      {sortedDates.map(date => (
        <div key={date}>
          <div className="text-black font-extrabold text-[18px] py-7">
          News for {new Date(date).getDate().toString().padStart(2, "0")}.{(new Date(date).getMonth() + 1).toString().padStart(2, "0")}.{new Date(date).getFullYear()}
          </div>
          {grouped[date].map(value => (
            <div
              key={value.web_url}
              className="flex justify-end items-start gap-[27px] h-[176px] border-b border-gray-300 py-5 cursor-pointer"
              onClick={() => window.open(value.web_url, '_blank')}
            >
              {value.multimedia?.[1]?.url ? (
                <LazyImage src={`https://www.nytimes.com/${value.multimedia[1].url}`} alt={value.abstract} />
              ) : null}
              <section className='flex flex-col justify-between w-[209px] h-full'>
                <div>
                  <h5 className='text-[#096FFA] text-[14px] font-extrabold'>
                    {value.source}
                  </h5>
                  <p className="font-normal line-clamp-4 leading-[22px] text-[16px]">{value.abstract}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {
                    new Date(value.pub_date).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }).replace(" AM", " AM").replace(" PM", " PM").replace(":", ".")
                  }
                </p>
              </section>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(MonthNews);
