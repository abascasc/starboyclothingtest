'use client';
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "@/components/footer"

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Size Guide</h1>
          <p className="text-muted-foreground mb-8">
            Find your perfect fit with our detailed size charts for all product categories.
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">How to Measure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src="/placeholder.svg?height=400&width=300"
                  alt="Measurement guide"
                  className="w-full h-auto rounded-lg border"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Chest / Bust</h3>
                  <p className="text-sm text-muted-foreground">
                    Measure around the fullest part of your chest, keeping the measuring tape horizontal.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Waist</h3>
                  <p className="text-sm text-muted-foreground">
                    Measure around your natural waistline, keeping the tape comfortably loose.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Hips</h3>
                  <p className="text-sm text-muted-foreground">
                    Measure around the fullest part of your hips, approximately 8" below your waistline.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Inseam</h3>
                  <p className="text-sm text-muted-foreground">
                    Measure from the crotch to the bottom of the leg along the inner seam.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="tops" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="tops">Tops</TabsTrigger>
              <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
              <TabsTrigger value="outerwear">Outerwear</TabsTrigger>
              <TabsTrigger value="shoes">Shoes</TabsTrigger>
            </TabsList>

            <TabsContent value="tops" className="space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-4">T-Shirts & Shirts (in cm)</h2>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Chest
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Length
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Shoulder
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">XS</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">86-91</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">65</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">42</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">S</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">91-96</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">67</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">44</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">M</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">96-101</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">69</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">46</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">L</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">101-106</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">71</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">48</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">XL</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">106-111</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">73</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">50</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">XXL</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">111-116</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">75</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">52</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bottoms" className="space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-4">Pants & Shorts (in cm)</h2>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Waist
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Hip
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Inseam (Pants)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">28</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">71</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">88</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">76</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">30</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">76</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">93</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">76</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">32</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">81</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">98</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">76</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">34</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">86</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">103</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">76</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">36</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">91</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">108</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">76</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">38</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">96</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">113</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">76</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="outerwear" className="space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-4">Jackets & Hoodies (in cm)</h2>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Chest
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Length
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Sleeve
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">XS</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">88-93</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">64</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">61</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">S</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">93-98</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">66</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">62</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">M</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">98-103</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">68</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">63</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">L</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">103-108</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">70</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">64</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">XL</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">108-113</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">72</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">65</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">XXL</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">113-118</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">74</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">66</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shoes" className="space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-4">Footwear Size Conversion</h2>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          US
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          EU
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          UK
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Foot Length (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">7</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">40</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">6</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">25</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">8</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">41</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">7</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">25.5</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">9</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">42</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">8</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">26.5</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">10</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">43</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">9</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">27.5</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">11</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">44</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">10</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">28.5</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">12</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">45</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">11</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">29.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">Fit Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Slim Fit</h3>
                  <p className="text-sm text-muted-foreground">
                    Our slim fit is tailored close to the body for a modern, streamlined look. If you prefer a looser
                    fit, we recommend sizing up.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Regular Fit</h3>
                  <p className="text-sm text-muted-foreground">
                    Our regular fit offers a balanced cut that's neither too tight nor too loose, providing comfort and
                    a classic look.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Oversized Fit</h3>
                  <p className="text-sm text-muted-foreground">
                    Our oversized fit is intentionally larger for a relaxed, contemporary style. If you prefer a more
                    fitted look, consider sizing down.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-medium mb-4">Still unsure about your size?</h2>
            <p className="text-muted-foreground mb-6">
              If you're between sizes or need personalized sizing advice, our customer service team is happy to help.
            </p>
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              href="/help/contact"
              className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-neutral-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

