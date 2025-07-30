import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Target, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'about cureai',
  description: 'learn more about cureai, our mission, and the team behind the project.',
};

const students = [
  { name: 'kandimalla harsha vardhan', reg: '11905169', features: 'symptom checker & diagnosis flow' },
  { name: 'sudhansu veram', reg: '12013789', features: 'remedy & diet plan generation' },
  { name: 'mohamed tauheed', reg: '11914853', features: 'ai chat and follow-up system' },
  { name: 'gopi pagadala', reg: '11806521', features: 'ui/ux and frontend development' },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary-foreground lowercase">
          about cureai
        </h1>
        <p className="mt-4 text-lg text-muted-foreground lowercase">
          empowering individuals with accessible health insights through ai.
        </p>
      </header>

      <div className="space-y-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl lowercase">
              <Target className="w-8 h-8 text-primary" />
              our mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground lowercase">
              our mission is to provide a reliable and user-friendly tool that helps people understand potential health issues based on their symptoms. by leveraging artificial intelligence, we aim to offer preliminary insights, including possible diagnoses, remedies, and dietary suggestions, making health information more accessible to everyone. we believe that informed individuals are better equipped to have productive conversations with healthcare professionals.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl lowercase">
              <Users className="w-8 h-8 text-primary" />
              who we are
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground lowercase">
              we are a team of passionate students dedicated to exploring the intersection of technology and healthcare. cureai is the culmination of our efforts to apply cutting-edge ai to solve real-world problems. our goal is to create applications that are not only technologically advanced but also genuinely helpful and easy to use for everyone, regardless of their technical expertise.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl lowercase">
              <BookOpen className="w-8 h-8 text-primary" />
              project details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 lowercase">
              this is a capstone project for the subject cse 445. below is the team that brought cureai to life.
            </p>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="lowercase">student name</TableHead>
                    <TableHead className="lowercase">registration number</TableHead>
                    <TableHead className="lowercase">features created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.reg}>
                      <TableCell className="font-medium lowercase">{student.name}</TableCell>
                      <TableCell className="lowercase">{student.reg}</TableCell>
                      <TableCell className="lowercase">{student.features}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
