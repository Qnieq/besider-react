import React from 'react';
import { NewsArticle } from '../../../types/news.types';
import { useGetNewsByMonthQuery } from '../../../services/news.service';
import LoadingIndicator from '../../ui/LoadingIndocator';

interface MonthNewsProps {
    year: number;
    month: number;
    polling?: boolean;
}

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
    const { data, error, isLoading } = useGetNewsByMonthQuery(
        { year, month },
        { pollingInterval: polling ? 30000 : 0 }
    );

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <div className="text-center py-4">Ошибка загрузки новостей.</div>;
    }

    const articles = data?.response.docs || [];

    // Сортируем статьи по убыванию даты публикации
    const sortedArticles = articles.sort(
        (a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime()
    );

    const grouped = groupByDate(sortedArticles);
    const sortedDates = Object.keys(grouped).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">
                {year}-{month < 10 ? '0' + month : month}
            </h2>
            {sortedDates.map(date => (
                <div key={date}>
                    <div className="bg-gray-100 text-gray-700 px-2 py-1 my-2 rounded">
                        {date}
                    </div>
                    {grouped[date].map((article, index) => (
                        <div
                            key={index}
                            className="border-b border-gray-200 py-2 cursor-pointer"
                            onClick={() => window.open(article.web_url, '_blank')}
                        >
                            <p className="font-medium">{article.abstract}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(article.pub_date).toLocaleTimeString()}
                            </p>
                            <p className="text-xs text-gray-400">{article.source}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MonthNews;
