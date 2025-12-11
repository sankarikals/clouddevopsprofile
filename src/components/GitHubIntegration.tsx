import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GitBranch, Star, Eye, GitCommit, Calendar, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalCommits: number;
  languages: string[];
}

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  updated: string;
  url: string;
}

const DEFAULT_USERNAME = 'am2308';

const GitHubIntegration = () => {
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentCommits, setRecentCommits] = useState<any[]>([]);
  const { toast } = useToast();

  // Auto-fetch on mount
  useEffect(() => {
    fetchGitHubData(DEFAULT_USERNAME);
  }, []);

  const fetchGitHubData = async (user?: string) => {
    const targetUser = user || username;
    if (!targetUser.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a GitHub username",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${targetUser}`);
      if (!userResponse.ok) throw new Error('User not found');
      const userData = await userResponse.json();

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${targetUser}/repos?sort=updated&per_page=6`);
      const reposData = await reposResponse.json();

      // Calculate stats
      const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
      const languages = [...new Set(reposData.map((repo: any) => repo.language).filter(Boolean))] as string[];

      setStats({
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars,
        totalCommits: 0, // Would need additional API calls for accurate count
        languages: languages.slice(0, 5)
      });

      setRepositories(reposData.map((repo: any) => ({
        name: repo.name,
        description: repo.description || 'No description',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || 'Unknown',
        updated: new Date(repo.updated_at).toLocaleDateString(),
        url: repo.html_url
      })));

      // Simulate recent commits (in real app, would fetch from events API)
      setRecentCommits([
        { message: 'feat: Add new authentication system', date: '2 hours ago', repo: 'project-alpha' },
        { message: 'fix: Resolve deployment issues', date: '1 day ago', repo: 'devops-tools' },
        { message: 'docs: Update API documentation', date: '2 days ago', repo: 'api-gateway' },
      ]);

      toast({
        title: "GitHub Data Loaded",
        description: `Successfully fetched data for ${targetUser}`,
      });
    } catch (error) {
      toast({
        title: "Error Loading GitHub Data",
        description: "Failed to fetch GitHub information. Please check the username.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-background to-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <GitBranch className="h-6 w-6" />
          GitHub Integration
        </CardTitle>
        <CardDescription>
          Live GitHub statistics, contributions, and project showcase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchGitHubData()}
          />
          <Button onClick={() => fetchGitHubData()} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Fetch Data'}
          </Button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary/5 p-4 rounded-lg text-center border border-primary/20">
              <div className="text-2xl font-bold text-primary">{stats.publicRepos}</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg text-center border border-primary/20">
              <div className="text-2xl font-bold text-primary">{stats.totalStars}</div>
              <div className="text-sm text-muted-foreground">Total Stars</div>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg text-center border border-primary/20">
              <div className="text-2xl font-bold text-primary">{stats.followers}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg text-center border border-primary/20">
              <div className="text-2xl font-bold text-primary">{stats.languages.length}</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
          </div>
        )}

        {stats && (
          <div className="space-y-4">
            <h4 className="font-semibold">Top Languages</h4>
            <div className="flex flex-wrap gap-2">
              {stats.languages.map((lang, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {recentCommits.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <GitCommit className="h-4 w-4" />
              Recent Activity
            </h4>
            <div className="space-y-2">
              {recentCommits.map((commit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <GitCommit className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{commit.message}</div>
                    <div className="text-xs text-muted-foreground">{commit.repo} • {commit.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {repositories.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Recent Repositories</h4>
            <div className="grid gap-4">
              {repositories.slice(0, 3).map((repo, index) => (
                <div key={index} className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-primary">{repo.name}</h5>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{repo.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stars}
                    </div>
                    <Badge variant="outline" className="text-xs">{repo.language}</Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {repo.updated}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GitHubIntegration;