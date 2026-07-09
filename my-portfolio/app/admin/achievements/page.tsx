import { AchievementForm } from "@/components/achievements/achievement-form";


import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";

import { PageHeader } from "@/components/shared/page-header";


import { Badge } from "@/components/ui/badge";

import {


  Table,

  TableBody,

  TableCell,

  TableHead,

  TableHeader,

  TableRow,


} from "@/components/ui/table";


import {deleteAchievementAction} from "@/lib/actions/achievements";
import {achievementCategories} from "@/config/categories";
import {getAllAchievements} from "@/lib/data/achievements";
import {formatDate} from "@/lib/utils/format-date";

interface AdminAchievementsPageProps {

  searchParams: Promise<{ edit?: string }>;

}


export default async function AdminAchievementsPage({
  searchParams,

}: AdminAchievementsPageProps) {

  const { edit } = await searchParams;



  let achievements: Awaited<ReturnType<typeof getAllAchievements>> = [];

  try {

    achievements = await getAllAchievements();

  } catch {

    achievements = [];

  }

  const editing = edit ? achievements.find((a) => a.id === edit) : undefined;



  return (

    <main className="flex-1 space-y-8 p-6">


      <PageHeader

        title="Achievements"

        description="Manage achievement entries and visibility."

      />


      <AchievementForm achievement={editing} key={editing?.id ?? "new"} />

      <Table>

        <TableHeader>

          <TableRow>


            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>

          </TableRow>



        </TableHeader>

        <TableBody>

          {achievements.map((achievement) => (

            <TableRow key={achievement.id}>
              <TableCell className="font-medium">{achievement.title}</TableCell>
              <TableCell>
                {achievementCategories.find((c) => c.value === achievement.category)?.label}
              </TableCell>


              <TableCell>{formatDate(achievement.achievement_date)}</TableCell>

              <TableCell>

                <Badge variant={achievement.is_published ? "default" : "secondary"}>

                  {achievement.is_published ? "Published" : "Draft"}

                </Badge>

              </TableCell>

              <TableCell className="text-right">


                <div className="flex justify-end gap-2">

                  <a href={`/admin/achievements?edit=${achievement.id}`}>
                    <Badge variant="outline" className="cursor-pointer px-3 py-1">
                      Edit
                    </Badge>
                  </a>
                  <DeleteConfirmDialog

                    title="Delete achievement"
                    description={`Delete "${achievement.title}"?`}
                    onConfirm={async () => {

                      await deleteAchievementAction(achievement.id);


                    }}

                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
